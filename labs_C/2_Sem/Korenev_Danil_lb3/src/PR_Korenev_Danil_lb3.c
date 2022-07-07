#include <stdio.h>
#include <dirent.h>
#include <string.h>

long long readMulDir(char* mul);

long long readAddDir(char* rootPath){
    //потенциальный файл с числами
    FILE *file;
    //открыли директорию
    DIR *dirArr = opendir(rootPath);
    long long cnt = 0;
    int c;
    long long value;

    if (dirArr){
        //взяли элемент директории
        struct dirent *dir = readdir(dirArr);
        while (dir){

            //если не назад
            if (dir->d_name[0] == '.'){
                dir = readdir(dirArr);
                continue;
            }

            //папка add
            if (strcmp(dir->d_name, "add") == 0) {
                strcat(rootPath, "/add");
                cnt += readAddDir(rootPath);
                rootPath[strlen(rootPath) - 4] = '\0';
            }

                //папка mul
            else if (strcmp(dir->d_name, "mul") == 0){
                strcat(rootPath, "/mul");
                cnt += readMulDir(rootPath);
                rootPath[strlen(rootPath) - 4] = '\0';
            }

                //файл в папке add -> надо прибавить в cnt сумму чисел файла
            else {
                strcat(rootPath, "/");
                strcat(rootPath, dir->d_name);
                file = fopen(rootPath, "r");
                while (c != EOF && (char)c != '\n' && fscanf(file, "%lld", &value) != EOF){
                    cnt += value;
                }
                fclose(file);
                rootPath[strlen(rootPath) - strlen(dir->d_name) - 1] = '\0';
            }

            //к следующей папаке/файлу
            dir = readdir(dirArr);
        }
    }
    closedir(dirArr);
    return cnt;
}

long long readMulDir(char* rootPath){
    FILE *file;
    DIR *dirArr = opendir(rootPath);
    long long cnt = 1;
    int c;
    long long value;
    if(dirArr){
        struct dirent* dir = readdir(dirArr);
        while (dir){

            //если не назад
            if (dir->d_name[0] == '.'){
                dir = readdir(dirArr);
                continue;
            }

            //папка add
            if (strcmp(dir->d_name, "add") == 0) {
                strcat(rootPath, "/add");
                cnt *= readAddDir(rootPath);
                rootPath[strlen(rootPath) - 4] = '\0';
            }

                //папка mul
            else if (strcmp(dir->d_name, "mul") == 0){
                strcat(rootPath, "/mul");
                cnt *= readMulDir(rootPath);
                rootPath[strlen(rootPath) - 4] = '\0';
            }

                //файл в папке mul -> надо умножить cnt на произведение чисел файла
            else {
                strcat(rootPath, "/");
                strcat(rootPath, dir->d_name);
                file = fopen(rootPath, "r");
                while (c != EOF && c != '\n' && fscanf(file, "%lld", &value) != EOF){
                    cnt *= value;
                }
                fclose(file);
                rootPath[strlen(rootPath) - strlen(dir->d_name) - 1] = '\0';
            }

            dir = readdir(dirArr);
        }

    }
    closedir(dirArr);
    return cnt;
}



int main() {
    char path[1000] = "./result.txt";
    char tmp[1000] = "./tmp";

    FILE *file = fopen(path, "w");
    fprintf(file, "%lld", readAddDir(tmp));
    printf("%d\n", readAddDir(tmp));

    return 0;
}