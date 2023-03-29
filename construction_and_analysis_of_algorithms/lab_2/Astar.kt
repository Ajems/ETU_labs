val LOG = true

class Node(// поле названия вершины
    private val name: String
){
    // Хэш Мап получения расстояния до смежной вершины по ее имени
    private val ways = HashMap<String, Float>()

    var code: Float = name[0].code.toFloat()

    // поля расстояния, эвристической оценки и веса вершины
    var distance: Float = Float.MAX_VALUE //пройденное расстояние
    var heuristic: Float = Float.MAX_VALUE //эвристическое расстояние до финиша
    var weight: Float = Float.MAX_VALUE // вес клетки
    // поле хранения пути от начальной вершины до нее самой
    var route = ""

    // добавить вершину в которую можно прийти
    fun addWay(node: String, distance: Float){
        ways[node] = distance
    }

    // получить расстояние до вершины
    fun getWay(name: String): Float{
        if (name in ways)
            return ways[name]!!
        return Float.MAX_VALUE
    }

    // получить все вершины в которые можно пойти
    fun getWays(): ArrayList<String>{
        val res = arrayListOf<String>()
        ways.keys.forEach { res.add(it) }
        return res
    }

    // преобразование вершины в строку
    override fun toString(): String {
        var result = "\t"
        ways.forEach{
            result += it.key + " " + it.value.toString() + "\n\t"
        }
        return "$name dist = $distance huer = $heuristic \n$result"
    }
}


fun main(args: Array<String>) {
    // считать начальную и конечную вершины
    val (start, finish) = readln().split(" ")
    if (start == finish){
        println(start)
        return
    }

    // создать хэш мап, хранящую весь граф
    val graph = hashMapOf<String, Node>()

    // лямбда выражение для подсчета эвристики двух вершин
    val heur: (String, String) -> Float = {from, to ->
        //to[0].code.toFloat() - from[0].code.toFloat()
        graph[to]?.code!! - graph[from]?.code!!
    }

    // считывание данных до тех пор, пока они поступают
    try {
        while(true){
            val data = readln().split(" ")
            val startPointName = data[0]
            val finishPointName = data[1]
            val distance = data[2].toFloat()

            //если экземпляр вершины назначения еще не создан
            if (startPointName !in graph)
                graph[startPointName] = Node(startPointName)

            // если экземпляр вершины назначения еще не создан
            if (finishPointName !in graph)
                graph[finishPointName] = Node(finishPointName)

            // для гарантированно двух созданных точек надо добавить путь
            graph[startPointName]?.addWay(finishPointName, distance)
        }
    } catch (_: Exception){}

    graph.keys.forEach{
        val data = readln().split(" ")
        graph[data[0]]?.code = data[1].toFloat()
    }

    // установить корректные данные для стартовой вершины
    graph[start]?.distance = 0.0F
    graph[start]?.heuristic = heur(start, finish)
    graph[start]?.weight = graph[start]?.distance!! + graph[start]?.heuristic!!
    graph[start]?.route = start

    // начальная вершина становится текущей
    var currentNode = start
    // начальная вершина добавляется в массив вершин для просмотра
    val possibleRoutes = arrayListOf<String>(currentNode)

    // алгоритм А стар
    while (possibleRoutes.isNotEmpty()) {
        if (LOG) println("\nNext\n")
        if (LOG) println("Массив возможных вершин $possibleRoutes")

        // выбор наименьшей вершины из массива
        println("Сортировка вершин")
        println(possibleRoutes)
        println(possibleRoutes)
        currentNode = possibleRoutes.minWithOrNull(Comparator{ o1, o2 ->
            if(graph[o1]?.weight!! < graph[o2]?.weight!!) {
                println("o1 weight < o2 weight")
                return@Comparator -1
            }else if (graph[o1]?.weight!! == graph[o2]?.weight!!){
                println("o1 weight == o2 weight")
                if (heur(o1, finish) < heur(o2, finish)){
                    println("heur(o1, finish) < heur(o1, finish): ${heur(o1, finish)} < ${heur(o2, finish)}")
                    return@Comparator -1
                }else
                    return@Comparator 1
            }
            else
                println("o1 weight > o2 weight: ${graph[o1]?.weight!!} > ${graph[o2]?.weight!!}")
                return@Comparator 1
        }).toString()
        if (LOG) println("Выбрана минимальная вершина $currentNode")

        // проверка на окончание работы алгоритма
        if (currentNode == finish)
            break

        // так как пути из данной вершины будут просмотрены, ее можно удалить из массива
        if (LOG) println("Вершина $currentNode исключена из массива")
        possibleRoutes.remove(currentNode)

        // просматривается каждая вершина, в которую можно попасть из текущей
        graph[currentNode]?.getWays()?.forEach {
            // сумма расстояния из текущей клетки и расстояния до соседней (it) вершины
            val score = graph[currentNode]?.distance?.plus(graph[currentNode]?.getWay(it)!!)!!

            // если это расстояние меньше, то был найден новый, более короткий путь
            if (score < graph[it]?.distance!!){
                // все поля получают новые значения расстояния, эвристики, вес
                if (LOG) println("При прохождении из $currentNode в $it путь можно сократить")
                graph[it]?.route = graph[currentNode]?.route+it // путь состоит из пути текущей вершины и самОй вершины
                graph[it]?.distance = graph[currentNode]?.distance?.plus(graph[currentNode]?.getWay(it)!!)!!
                graph[it]?.heuristic = heur(it, finish)
                graph[it]?.weight = graph[it]?.heuristic?.plus(graph[it]?.distance!!)!!
                // добавить в массив вершин для просмотра
                if (it !in possibleRoutes){
                    possibleRoutes.add(it)
                }
                if (LOG) println(graph[it]!!)
            }
        }
    }

    // полученный граф, с просчитанными (не для всех) вершинами
    graph.forEach {
        if (LOG) println(it.toString())
    }

    // вывод результата
    if (graph[finish]?.route == "") println("no route")
    else println(graph[finish]?.route)
}