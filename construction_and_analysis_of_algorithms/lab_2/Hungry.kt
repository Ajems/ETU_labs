import kotlin.math.min

fun main(args: Array<String>) {
    // считывание данных
    var (start, finish) = readln().split(" ")
    // создание хэш мап - граф
    val graph = hashMapOf<String, ArrayList<Pair<String, Double>>>()

    // считывание данных
    var data = readln().split(" ")
    try {
        while(true){
            val startPoint = data[0]
            val finishPoint = data[1]
            val distance = data[2]
            if (startPoint in graph)
                graph[startPoint]?.add(Pair(finishPoint, distance.toDouble()))
            else
                graph[startPoint] = arrayListOf(Pair(finishPoint, distance.toDouble()))
            data = readln().split(" ")
        }
    } catch (_: Exception){}


    // создание переменных
    var route = start
    val minDistance = arrayListOf<Double>()
    var nextWay: String
    // запуск алгоритма
    while (start != finish){
        println("Way passed: $route - $minDistance - ${minDistance.sum()}")

        // проверка на поиск следующей вершины
        if (!graph.containsKey(start) or (graph[route.last().toString()]?.isEmpty() == true)){
            //удалить ребро по которому прошлись
            if (minDistance.isEmpty()){
                println("No route")
                return
            }
            graph[start]?.remove(Pair(route.last().toString(), minDistance.last()))
            println("Delete route to ${route.last().toString()} with distance ${minDistance.last()}")
            //возврат к предыдущей вершине
            route = route.dropLast(1)
            start = route.last().toString()
            println("F*ck go back. Way was $minDistance - ${minDistance.sum()}")
            minDistance.removeLast()
            println("Now it is $minDistance - ${minDistance.sum()} \n")
            continue
        }

        println("calculate next way")
        // обнуление данных
        minDistance.add(0.0)
        nextWay = ""

        // поиск минимальной вершины (с минимальным ребром)
        graph[start]?.forEach{
            if (nextWay == ""){
                minDistance[minDistance.lastIndex] = it.second
                nextWay = it.first
            } else if (it.second < minDistance[minDistance.lastIndex]){
                minDistance[minDistance.lastIndex] = it.second
                nextWay = it.first
            }
        }

        // удаление элемента из хэш мап
        graph[start]?.remove(Pair(nextWay, minDistance.last()))
        println("Edge to $nextWay with length ${minDistance.last()} deleted")

        // берется следующая текущая вершина
        start = nextWay
        // изменение пути
        route+=start
        println(route)
        println(minDistance.sum())
        println()
    }
    // вывод результата
    println(route)
}
/*
a e
a b 3.0
b c 1.0
c d 1.0
a c 3.0
a e 4.0
 */

/*
a e
a b 3.0
b c 1.0
c d 1.0
a c 3.0
a e 4.0
a d 2.0
d f 3.0
 */

/*
w e
w a 2.0
a b 3.0
b c 1.0
c d 1.0
a c 3.0
a e 4.0
a d 2.0
d f 3.0
 */