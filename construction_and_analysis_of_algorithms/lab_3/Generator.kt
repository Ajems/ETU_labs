import java.io.File
import kotlin.random.Random

fun main() {
    val size = Random.nextInt(3, 11)
    val start = Random.nextInt(0, size+1)
    val matrix = Array(size) { IntArray(size) }
    for (i in 0 until size) {
        for (j in 0 until size) {
            if (i != j) {
                matrix[i][j] = Random.nextInt(1, 1001)
            }
        }
    }
    val file = File("matrix$size.txt")
    file.bufferedWriter().use { out ->
        out.write("$start\n")
        out.write("$size\n")
        for (i in 0 until size) {
            for (j in 0 until size) {
                if (i != j) {
                    out.write("${i+1} ${j+1} ${matrix[i][j]}\n")
                }
            }
        }
    }
}
