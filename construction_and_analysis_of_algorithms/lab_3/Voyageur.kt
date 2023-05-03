import java.io.File

val LOG = true

class Matrix(private val size: Int): Cloneable {
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

    public override fun clone(): Matrix {
        val newMatrix = Matrix(size)
        newMatrix.route = mutableListOf<Pair<Int, Int>>()
        route.forEach { newMatrix.route.add(it) }
        newMatrix.lowLine = lowLine.toInt()
        newMatrix.data = mutableMapOf<Int, MutableMap<Int, Int>>()

        for ((key, innerMap) in data) {
            val clonedInnerMap = innerMap.toMutableMap()
            newMatrix.data[key] = clonedInnerMap
        }
        return newMatrix
    }

    operator fun compareTo(other: Matrix) : Int{
        return this.lowLine - other.lowLine
    }

    operator fun set(row: Int, col: Int, value: Int){
        data[row]?.set(col, value)
    }

    operator fun get(row: Int, col: Int): Int {
        return data[row]!!.get(col)!!
    }

    fun addRoute(city: Pair<Int, Int>){
        route+=city
    }

    fun getRoute(): MutableList<Pair<Int, Int>>{
        return(route)
    }

    fun increaseLowLine(value: Int){
        lowLine+=value
    }

    fun getLowLine() = lowLine

    fun setLowArray(array: Pair<Int, ArrayList<Triple<Int, Int, Int>>>){
        currentLowArray = array
    }

    fun getLowArray(): Pair<Int, ArrayList<Triple<Int, Int, Int>>>{
        return currentLowArray
    }

    fun includeRowCol(row: Int, col: Int){
        if (col in data.keys){
            if (row in data[col]!!.keys){
                this[col, row] = Int.MAX_VALUE
            }
        }
        data.remove(row)
        for (keys in data.keys){
            data[keys]?.remove(col)
        }
        route+=Pair(row, col)
    }

    fun exceptionRowCol(row: Int, col: Int){
        data[row]?.set(col, Int.MAX_VALUE)
        route+=Pair(col, row)
    }

    fun countLow(flag: Boolean): Pair<Int, ArrayList<Triple<Int, Int, Int>>>{
        var countLow = 0
        val minIndexes = ArrayList<Triple<Int, Int, Int>>()

        for (key in data.keys){
            //минимальное значение в строке
            val currentRowMin: Int = data[key]!!.minBy { it.value }.value
            var minColIndex = 0
            for ((keyInner, value) in data[key]!!.entries){
                if (value == currentRowMin){
                    minColIndex = keyInner
                    break
                }
            }
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

            for (innerMap in data.values) {
                if (flag && innerMap[key]!! != Int.MAX_VALUE) innerMap[key] = innerMap[key]!! - minValue
            }
            countLow += minValue
        }
        return Pair(countLow, minIndexes)
    }

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

    fun getHeavyZero(zerosArray: ArrayList<Triple<Int, Int, Int>>): Triple<Int, Int, Int> {
        var mostHeavyZero: Triple<Int, Int, Int> = Triple(0, 0, 0)
        var currentHeavy = 0
        //нулевой элемент, который после замены на oo и
        //последующего приведения матрицы
        // даст максимальную нижнюю границу
        // стоимости любого решения
        zerosArray.forEach {
            print("Проверка на тяжелый ноль ${it.first}:${it.second} = ")
            this[it.first, it.second] = Int.MAX_VALUE
            currentHeavy = this.countLow(false).first
            if (currentHeavy < 0) currentHeavy = 0
            println(currentHeavy)
            if (currentHeavy >= mostHeavyZero.third){
                mostHeavyZero = Triple(it.first, it.second, currentHeavy)
            }
            this[it.first, it.second] = 0
        }
        return mostHeavyZero
    }

    fun isFull(): Boolean {
        println("проверка на полный из route = $route --- ${route.size >= size-1}")
        return (route.size == size-1)
    }

    fun getWay(start: Int): MutableList<Int>{
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
        println(mapRoute)

        //построить путь
        while(way.first() != way.last() || way.size<2){
            if (way.last() in mapRoute)
                way.add(mapRoute[way.last()]!!)
            else{
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
            println(way)
        }
        return way
    }

    fun wayLength(answer: MutableList<Int>): Int {
        var count = 0
        for (pairs in answer.windowed(2)){
            count+=data[pairs[0]]!![pairs[1]]!!
            println("${pairs[0]} to ${pairs[1]} is ${data[pairs[0]]!![pairs[1]]!!}")
        }
        return count
    }
}

fun main(args: Array<String>) {
    val file = File("src/main/resources/goodexample/matrix2.txt")
    var startPoint: Int
    var size: Int
    var graph: Matrix
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

    var countStep = 0
    val answer: MutableList<Int>
    graph.print()

    val originalGraph = graph.clone()
    //Начальная матрица. Уже приведена и посчитана нижняя граница
    val graphsArray = ArrayList<Matrix>()
    graph.setLowArray(graph.countLow(true))
    graph.increaseLowLine(graph.getLowArray().first)
    graphsArray.add(graph)

    while (true){
        //debug
        countStep++
        //println("Waiting next step $countStep")
        graphsArray.forEach{ it.print().also { println() } }

        //взятие минимальной по нижней границе матрицы
        val currentGraph = graphsArray.minBy { it.getLowLine() }
        graphsArray.remove(currentGraph)
        println("Рассматривается граф:\nlowLine = ${currentGraph.getLowLine()}\nroute = <${currentGraph.getRoute()}>")
        currentGraph.print()

        //найти самый тяжелый ноль
        val heavyZero: Triple<Int, Int, Int> = currentGraph.getHeavyZero(currentGraph.getLowArray().second)
        println("Тяжелый ноль: $heavyZero")

        //ветвление
        val newGraphInclude = currentGraph.clone()
        val newGraphException = currentGraph.clone()

        // 1 включение дуги
        newGraphInclude.includeRowCol(heavyZero.first, heavyZero.second)
        println("Ветвление влево дало")
        newGraphInclude.print()
        if (newGraphInclude.isFull()){
            answer = newGraphInclude.getWay(startPoint)
            break
        }
        // привести матрицу и увеличить нижнюю границу
        newGraphInclude.setLowArray(newGraphInclude.countLow(true))
        newGraphInclude.increaseLowLine(newGraphInclude.getLowArray().first)
        // добавить в массив кандидатов
        graphsArray.add(newGraphInclude)
        println("Нижняя граница ${newGraphInclude.getLowLine()}")
        println("Матрица после приведения")
        newGraphInclude.print()
        println()

        //2 исключение дуги
        newGraphException.exceptionRowCol(heavyZero.first, heavyZero.second)
        println("Ветвление вправо дало")
        newGraphException.print()
        if (newGraphException.isFull()){
            answer = newGraphException.getWay(startPoint)
            break
        }
        //после замены на оо надо привести матрицу и увеличить нижнюю границу (=heavyZero.first)
        newGraphException.setLowArray(newGraphException.countLow(true))
        newGraphException.increaseLowLine(newGraphException.getLowArray().first)
        //добавить в кандидаты
        graphsArray.add(newGraphException)
        println("Нижняя граница ${newGraphException.getLowLine()}")
        println("Матрица после приведения")
        newGraphException.print()
        println()
    }
    println("Наикратчайший путь $answer")
    println("Длина пути ${originalGraph.wayLength(answer)}")
}