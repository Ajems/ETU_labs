#include <iostream>
#include <vector>
#include <tuple>
#include <valarray>


class Table{
private:
    int size = 0;
    int freeArea = 0;
    int amountSquare = 0;
    //x y w
    std::vector<std::tuple<int, int, int>> squarePlaces;
public:
    Table(int size): size(size){
        freeArea = size*size;
    }

    bool insertSquare(int sqSize, int column, int row) {
        freeArea -= sqSize * sqSize;
        amountSquare++;
        squarePlaces.emplace_back( column, row, sqSize);
        return true;
    }

    bool isFree(int x, int y){
        for (std::tuple<int, int, int> csq: squarePlaces){
            if ((std::get<0>(csq) <= x) and
                (x < (std::get<0>(csq)+std::get<2>(csq))) and
                (std::get<1>(csq) <= y) and
                (y < (std::get<1>(csq)+std::get<2>(csq))))
            {
                return false;
            }
        }
        return true;
    }

    void print(){
        std::vector<std::vector<int>> table;
        for (int row = 0; row < size; ++row){
            table.emplace_back();
            for (int column = 0; column < size; ++column){
                table.at(row).push_back(0);
            }
        }
        for (std::tuple<int, int, int> csq: squarePlaces) {
            int sqSize = std::get<2>(csq);
            for (int x = std::get<0>(csq); x < std::get<0>(csq) + std::get<2>(csq); ++x) {
                for (int y = std::get<1>(csq); y < std::get<1>(csq) + std::get<2>(csq); ++y) {
                    table.at(y).at(x) = sqSize;
                }
            }
        }

        bool flag = table.at(0).at(0) > 9;
        for (int y = 0; y < size; ++y){
            for (int x = 0; x < size; ++x){
                int value = table.at(y).at(x);
                if (value < 10) std::cout << " ";
                std::cout << value << " ";
            }
            std::cout << "\n";
        }
    }

    bool isFull(){
        return (freeArea == 0);
    }

    int getAmountSquare(){
        return amountSquare;
    }

    std::vector<std::tuple<int, int, int>> getSquarePlaces(){
        return squarePlaces;
    }

    void printData(){
        std::cout << amountSquare << "\n";
        for (auto data: squarePlaces){
            std::cout << std::get<0>(data)+1 << " " << std::get<1>(data)+1 << " " << std::get<2>(data) << "\n";
        }
    }

    int getFreeArea(){
        return freeArea;
    }
};

int step = 1;
int boardSize = 1;
int bestSolutionCountSquare = 0;
Table solution(0);

void backtracking(Table& table, int minX, int minY){
    for (int x = minX; x < step; ++x){
        for (int y = minY; y < step; ++y){
            // x and y измеряются в штуках (чанках) т.е. количестве boardsize
            //если можно вставить в координату
            if (table.isFree(x*boardSize, y*boardSize)){
                //std::cout << "x = " << x << " y = " << y << "\n";

                //maxCountStepSizeNewSquare измеряется в штуках (чанках) boardsize
                //так как step это максимальное кол-во штук (чанков) boardsizeб то берем на один меньше (нельзя квадрат равноый столу)
                //step-x это длина в штуках которая вместится от координаты x до правого края
                //step-y это длина в штуках которая вместится от координаты y до низа стола
                //выбираем их этого наименьшее, чтобы вмещалось
                int maxCountStepSizeNewSquare = std::min(step-1, std::min(step-x, step-y));
                //std::cout << "r first = " << maxCountStepSizeNewSquare << '\n';

                //для каждого вставленного квадрата рассматриваем случай
                for (std::tuple<int, int, int> square: table.getSquarePlaces()){
                    //std::cout << "see sq size " << std::get<2>(square) << " x = " << std::get<0>(square) << " y = " << std::get<1>(square) << "\n";

                    //если нашелся квадрат который ниже по координате y и "налазит" или превышет по координате x на текущую координату (x;y)
                    if (std::get<0>(square)+std::get<2>(square) > x*boardSize && std::get<1>(square) > y*boardSize){
                        //std::cout << "choose min of " << maxCountStepSizeNewSquare << " and " << std::get<1>(square)/boardSize - y << '\n';
                        //надо уменьшить сторону вставляемого квадрата до максимально возможного
                        //для этого надо рассмотреть предыдущий вариант и
                        //т.к. снизу есть квадрат (см. условие по y) то надо выбрать размер, чтобы новый квадрат не налез на этот нижний
                        maxCountStepSizeNewSquare = std::min(maxCountStepSizeNewSquare, std::get<1>(square)/boardSize - y);
                    }
                }
                //std::cout << x << " x " << y << " y " << maxCountStepSizeNewSquare << " r\n";

                //перебрать все радиусы бэктрекингом
                for (int countStepSizeNewSquare = maxCountStepSizeNewSquare; countStepSizeNewSquare > 0; --countStepSizeNewSquare) {
                    //чтобы не менять исходный стол, создать новый
                    Table nextTable = table;
                    //зная максимальный возможный размер вставляемого квадрата будем вставлять его в новый стол
                    //причем уменьшать его сторону на один (цикл for), чтобы сделать перебор значений
                    nextTable.insertSquare(countStepSizeNewSquare*boardSize, x * boardSize, y * boardSize);
                    //std::cout << "insert size " << countStepSizeNewSquare << " in x = " << x*boardSize << " y = " << y * boardSize << "\n";

                    //если стол максимально заполнен, надо сделать проверку на лучший результат
                    if (nextTable.isFull()) {
                        //если в нем количество квадраторв меньше чем в лучшем результате
                        if (nextTable.getAmountSquare() < bestSolutionCountSquare) {
                            //сдлеать замену количества лучшего результата и решения
                            bestSolutionCountSquare = nextTable.getAmountSquare();
                            solution = nextTable;
                        }
                    } else {
                        //если стол заполнен не до конца, но в нем УЖЕ больше квадратов чем в лучшем решении
                        //то заканчиваем перебор, т.к. лучшее решение из этого не получить
                        if (nextTable.getAmountSquare() < bestSolutionCountSquare) {
                            //если же еще есть смысл дополнять, запускам бэктрекинг от полученного стола
                            //с аргументами x (так как "левее" уже все заполнилось в главном цикле for)
                            //и y + countStepSizeNewSquare так как вставаили квадрат в коодинату y и размером cSSNS
                            backtracking(nextTable, x, y + countStepSizeNewSquare);
                        } else return;
                    }
                }
                return;
            }
        }
        //так как заполнение идет по столбцам, а уже потом по рядам(цикл for y внутренний)
        //то после того как мы посмотрели текущий столбец, следующий следует начинать рассматривать выше
        minY = step/2;
    }
}

int main() {
    int size = 0;
    std::cin >> size;
    // поиск наибольшего делителя size
    for (int i = 1; i < size; ++i){
        if (size%i == 0) boardSize = i;
    }
    step = size/boardSize; // => step*boardSize = size of table
    //std::cout << "step = " << step << " boardSize = " << boardSize << "\n";
    // начальное приближение это такое приближение,
    // когда весь стол можно заполнить одинаковыми
    // квадратами размера boardsize, по ширине и высоте их по step штук

    Table table(size);
    table.insertSquare(((step+1)/2)*boardSize, 0, 0);
    table.insertSquare((step/2)*boardSize, 0, ((step+1)/2)*boardSize);
    table.insertSquare((step/2)*boardSize, ((step+1)/2)*boardSize, 0);
    bestSolutionCountSquare = 3 + table.getFreeArea(); // 3 + остальные единицы
    // стартовая позиция
    //table.print();

    //backtraking
    backtracking(table, step/2, (step+1)/2);

    //result
    solution.printData();
    solution.print();

    return 0;
}