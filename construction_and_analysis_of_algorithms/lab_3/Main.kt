import java.io.File

val LOG = true

class Matrix(private val size: Int): Cloneable {
    //  инициализация переменных
    private var route = mutableListOf<Pair<Int, Int>>()
    private var lowLine = 0
    private lateinit var currentLowArray: Pair<Int, ArrayList<Triple<Int, Int, Int>>>
    private var data: MutableMap<Int, MutableMap<Int, Int>> = mutableMapOf<Int, MutableMap<Int, Int>>().apply {
        for (i in 1..this@Matrix.size) {
            this[i] = mutableMapOf<Int, Int>().apply {
                for (j in 1..this@Matrix.size) {
                    this[j] = Int.MAX_VALUE
                }
            }
        }
    }

    // копирование объекта
    public override fun clone(): Matrix {
        val newMatrix = Matrix(size)

        newMatrix.route = mutableListOf()
        route.forEach { newMatrix.route.add(it) }

        newMatrix.lowLine = lowLine
        newMatrix.data = mutableMapOf()

        for ((key, innerMap) in data) {
            val clonedInnerMap = innerMap.toMutableMap()
            newMatrix.data[key] = clonedInnerMap
        }
        return newMatrix
    }

    // оператор установки занчение по координате
    operator fun set(row: Int, col: Int, value: Int){
        data[row]?.set(col, value)
    }

    // оператор получения значения по координате
    operator fun get(row: Int, col: Int): Int {
        return data[row]!!.get(col)!!
    }

    // получение поля route
    fun getRoute(): MutableList<Pair<Int, Int>>{
        return route
    }

    // увеличение поля нижней границы
    fun increaseLowLine(value: Int){
        lowLine+=value
    }

    // получене значения нижней границы
    fun getLowLine(): Int = lowLine

    // смена массива
    fun setLowArray(array: Pair<Int, ArrayList<Triple<Int, Int, Int>>>){
        currentLowArray = array
    }

    // получение массива
    fun getLowArray(): Pair<Int, ArrayList<Triple<Int, Int, Int>>>{
        return currentLowArray
    }

    // включение поля
    fun includeRowCol(row: Int, col: Int){
        if (col in data.keys){
            if (row in data[col]!!.keys){
                // установить бесконечность на обратную координату
                this[col, row] = Int.MAX_VALUE
            }
        }
        // удалить строку и столбец
        data.remove(row)
        for (keys in data.keys){
            data[keys]?.remove(col)
        }
        // добавить ребро в путь
        route+=Pair(row, col)
    }

    // исключение ребра
    fun exceptionRowCol(row: Int, col: Int){
        // установление бесконечности по координате
        data[row]?.set(col, Int.MAX_VALUE)
        // добавить ребро в путь
        route+=Pair(col, row)
    }

    // подсчет минимальной нижней границы и массив минимальных элементов с их координатами
    fun countLow(flag: Boolean): Pair<Int, ArrayList<Triple<Int, Int, Int>>>{
        var countLow = 0
        val minIndexes = ArrayList<Triple<Int, Int, Int>>()

        //для каждой строки
        for (key in data.keys){
            //минимальное значение в строке
            val currentRowMin: Int = data[key]!!.minBy { it.value }.value
            val minColIndex = data[key]!!.filterValues { it == currentRowMin }.keys.first()

            //добавить минимальный элемент
            minIndexes.add(Triple(key, minColIndex, currentRowMin))

            //вычитаем если нужно
            for((innerKey, value) in data[key]!!){
                if (flag && data[key]!![innerKey]!= Int.MAX_VALUE)
                    data[key]!![innerKey] = value - currentRowMin
            }

            //нижняя граница выше
            countLow+=currentRowMin
            //if (LOG) println("Минимальный элемент в $key строке $currentRowMin")
        }

        // для каждого столбца
        for (key in data[data.keys.first()]!!.keys) {
            //поиск минимального
            var minValue = Int.MAX_VALUE // начальное значение минимального элемента
            var minRowIndex = 0
            for (innerMap in data.values) {
                innerMap[key]?.let {
                    if (it < minValue) {
                        minValue = it
                        minRowIndex = data.keys.find { data[it] == innerMap}!!
                    }
                }
            }
            minIndexes.add(Triple(minRowIndex, key, minValue))

            // вычитаем если нужно
            for (innerMap in data.values) {
                if (flag && innerMap[key]!! != Int.MAX_VALUE) innerMap[key] = innerMap[key]!! - minValue
            }
            countLow += minValue
        }
        // вернуть пару минимальной нижней границы и массива минимальных жлементов
        return Pair(countLow, minIndexes)
    }

    // вывод матрицы
    fun print(){
        print("     ")
        for (key in data[data.keys.first()]!!.keys.sorted()) print("%5d".format(key))
        println()
        for (key in data[data.keys.first()]!!.keys) print("-----")
        print("-----")
        println()
        for (key in data.keys.sorted()){
            print("%3d|".format(key))
            for (innerKey in data[key]!!.keys.sorted()){
                val value = this.get(key, innerKey)
                if (value == Int.MAX_VALUE) print("    ∞")
                else print("%5d".format(value))
            }
            println()
        }

    }

    // получение "тяжелого нуля"
    fun getHeavyZero(zerosArray: ArrayList<Triple<Int, Int, Int>>): Triple<Int, Int, Int> {
        var mostHeavyZero: Triple<Int, Int, Int> = Triple(0, 0, 0)
        var currentHeavy = 0
        //нулевой элемент, который после замены на oo и
        //последующего приведения матрицы
        // даст максимальную нижнюю границу
        // стоимости любого решения
        zerosArray.forEach {
            if (LOG) print("Проверка на тяжелый ноль ${it.first}:${it.second} = ")
            this[it.first, it.second] = Int.MAX_VALUE
            currentHeavy = this.countLow(false).first
            if (currentHeavy < 0) currentHeavy = 0
            if (LOG) println(currentHeavy)
            if (currentHeavy >= mostHeavyZero.third){
                // найден ноль тяжелее
                mostHeavyZero = Triple(it.first, it.second, currentHeavy)
                if (LOG) println("Найден более тяжелый ноль ${it.first} ${it.second} - ${currentHeavy}")
            }
            this[it.first, it.second] = 0
        }
        return mostHeavyZero
    }

    // проверка на окончание алгоритма
    fun isFull(): Boolean {
        if (LOG) println("проверка на полный путь из route = $route --- ${route.size >= size-1}")
        return (route.size == size-1)
    }

    // построение пути
    fun getWay(start: Int): MutableList<Int>{
        if(LOG) println("Построение пути")
        // последовательность вершин
        val way = mutableListOf<Int>()
        way.add(start)
        val fromExist = mutableListOf<Int>()
        val toExist = mutableListOf<Int>()

        //заполнить мэп
        val mapRoute = mutableMapOf<Int, Int>()
        for (citysPair in route){
            mapRoute[citysPair.first]=citysPair.second
            fromExist.add(citysPair.first)
            toExist.add(citysPair.second)
        }
        if (LOG) println(mapRoute)

        //построить путь
        while(way.first() != way.last() || way.size<2){
            if (way.last() in mapRoute){
                // добавить существующее ребро
                way.add(mapRoute[way.last()]!!)
            } else {
                // достроить несуществующее ребро
                for (notExistFrom in 1..size){
                    if (notExistFrom !in fromExist){
                        for (notExistTo in 1..size){
                            if (notExistTo !in toExist){
                                mapRoute[notExistFrom] = notExistTo
                            }
                        }
                    }
                }
            }
            if (LOG) println("Путь $way")
        }
        return way
    }

    fun wayLength(answer: MutableList<Int>): Int {
        var count = 0
        for (pairs in answer.windowed(2)){
            // прибавить значние ребра
            count+=data[pairs[0]]!![pairs[1]]!!
            if (LOG) println("${pairs[0]} to ${pairs[1]} is ${data[pairs[0]]!![pairs[1]]!!}")
        }
        return count
    }
}

var startPoint: Int = 0
var bestLowLine = Int.MAX_VALUE

fun littleDFS(graph: Matrix): Pair<Int, MutableList<Int>>{
    val heavyZero: Triple<Int, Int, Int> = graph.getHeavyZero(graph.getLowArray().second)
    if (LOG) println("Тяжелый ноль: $heavyZero")

    //ветвление
    val newGraphInclude = graph.clone()
    val newGraphException = graph.clone()

    // 1 включение дуги
    newGraphInclude.includeRowCol(heavyZero.first, heavyZero.second)
    if (LOG) println("Ветвление влево дало")
    if (LOG) newGraphInclude.print()
    // проверка на окончаний
    if (newGraphInclude.isFull()){
        return Pair(newGraphInclude.getLowLine(), newGraphInclude.getWay(startPoint))
    } else if (newGraphInclude.getLowLine() < bestLowLine) {
        // привести матрицу и увеличить нижнюю границу
        newGraphInclude.setLowArray(newGraphInclude.countLow(true))
        newGraphInclude.increaseLowLine(newGraphInclude.getLowArray().first)
        if (LOG) println("Нижняя граница ${newGraphInclude.getLowLine()}")
        if (LOG) println("Матрица после приведения")
        if (LOG) newGraphInclude.print()
        if (LOG) println()
        return littleDFS(newGraphInclude)
    }

    //2 исключение дуги
    newGraphException.exceptionRowCol(heavyZero.first, heavyZero.second)
    if (LOG) println("Ветвление вправо дало")
    if (LOG) newGraphException.print()
    if (newGraphException.isFull()){
        return Pair(newGraphException.getLowLine(), newGraphException.getWay(startPoint))
    } else if (newGraphException.getLowLine() < bestLowLine) {
        //после замены на оо надо привести матрицу и увеличить нижнюю границу (=heavyZero.first)
        newGraphException.setLowArray(newGraphException.countLow(true))
        newGraphException.increaseLowLine(newGraphException.getLowArray().first)
        //добавить в кандидаты
        if (LOG) println("Нижняя граница ${newGraphException.getLowLine()}")
        if (LOG) println("Матрица после приведения")
        if (LOG) newGraphException.print()
        if (LOG) println()
        return littleDFS(newGraphException)
    }
    return Pair(Int.MAX_VALUE, mutableListOf())
}

fun main(args: Array<String>) {
    // создание переменных
    val file = File("src/main/resources/matrix.txt")
    var size: Int
    var graph: Matrix
    val answer: MutableList<Int>
    val graphsArray = ArrayList<Matrix>()
    //считывание данных
    file.bufferedReader().use { reader ->
        startPoint = reader.readLine().toInt()
        size = reader.readLine().toInt()
        require(startPoint in 1..size)
        graph = Matrix(size)
        reader.lines().forEach{ line ->
            val (i, j, distance) = line.split(" ").map{it.toInt()}
            graph[i, j] = distance
        }
    }

    if (LOG) graph.print()

    //клонирование объекта
    val originalGraph = graph.clone()
    //Начальная матрица должна быть приведена и посчитана нижняя граница
    graph.setLowArray(graph.countLow(true))
    graph.increaseLowLine(graph.getLowArray().first)
    graphsArray.add(graph)

    while (true){
        if (LOG) println("Матрицы на рассмотрении")
        if (LOG) graphsArray.forEach{ it.print().also { println() } }
        //взятие минимальной по нижней границе матрицы
        val currentGraph = graphsArray.minBy { it.getLowLine() }
        graphsArray.remove(currentGraph)
        if (LOG) println("Рассматривается граф:\nlowLine = ${currentGraph.getLowLine()}\nroute = <${currentGraph.getRoute()}>")
        if (LOG) currentGraph.print()

        //найти самый тяжелый ноль
        val heavyZero: Triple<Int, Int, Int> = currentGraph.getHeavyZero(currentGraph.getLowArray().second)
        if (LOG) println("Тяжелый ноль: $heavyZero")

        //ветвление
        val newGraphInclude = currentGraph.clone()
        val newGraphException = currentGraph.clone()

        // 1 включение дуги
        newGraphInclude.includeRowCol(heavyZero.first, heavyZero.second)
        if (LOG) println("Ветвление влево дало")
        if (LOG) newGraphInclude.print()
        // проверка на окончаний
        if (newGraphInclude.isFull()){
            answer = newGraphInclude.getWay(startPoint)
            break
        }
        // привести матрицу и увеличить нижнюю границу
        newGraphInclude.setLowArray(newGraphInclude.countLow(true))
        newGraphInclude.increaseLowLine(newGraphInclude.getLowArray().first)
        // добавить в массив кандидатов
        graphsArray.add(newGraphInclude)
        if (LOG) println("Нижняя граница ${newGraphInclude.getLowLine()}")
        if (LOG) println("Матрица после приведения")
        if (LOG) newGraphInclude.print()
        if (LOG) println()

        //2 исключение дуги
        newGraphException.exceptionRowCol(heavyZero.first, heavyZero.second)
        if (LOG) println("Ветвление вправо дало")
        if (LOG) newGraphException.print()
        if (newGraphException.isFull()){
            answer = newGraphException.getWay(startPoint)
            break
        }
        //после замены на оо надо привести матрицу и увеличить нижнюю границу (=heavyZero.first)
        newGraphException.setLowArray(newGraphException.countLow(true))
        newGraphException.increaseLowLine(newGraphException.getLowArray().first)
        //добавить в кандидаты
        graphsArray.add(newGraphException)
        if (LOG) println("Нижняя граница ${newGraphException.getLowLine()}")
        if (LOG) println("Матрица после приведения")
        if (LOG) newGraphException.print()
        if (LOG) println()
    }
    // вывести ответ
    println("${if (LOG) "Наикратчайший путь" else ""} $answer")
    println("${if (LOG) "Длина пути" else ""} ${originalGraph.wayLength(answer)}")
}