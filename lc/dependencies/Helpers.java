import java.util.Arrays;

public class Helpers {
    
    public static <T> void assertEquals(T expected, T actual, String info) {
        if (expected.equals(actual)) {
            return;
        }

        throw new AssertionError(
            "Assertion Error: " + info + "\n"
            + "\tExpected: " + expected + "\n"
            + "\tActual  : " + actual
        );
    }

    public static <T> void arraysAreEqual(int[] expected, int[] actual, String info) {
        if (Arrays.equals(expected, actual)) {
            return;
        }

        throw new AssertionError(
            "Assertion Error: " + info + "\n"
            + "\tExpected: " + Arrays.toString(expected) + "\n"
            + "\tActual  : " + Arrays.toString(actual)
        );
    }
}
