import java.util.HashMap;
import java.util.PriorityQueue;
import java.util.Map.Entry;

public class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        var map = new HashMap<Integer, Integer>();
        for (int num : nums) {
            if (!map.containsKey(num)) {
                map.put(num, 0);
            }

            map.put(num, map.get(num) + 1);
        }

        var pq = new PriorityQueue<Entry<Integer, Integer>>((a, b) -> b.getValue() - a.getValue());
        pq.addAll(map.entrySet());

        int[] elements = new int[k];
        for (int i = 0; i < elements.length; i++) {
            elements[i] = pq.poll().getKey();
        }

        return elements;
    }

    public static void main(String[] args) {
        var t = new Solution();
        Helpers.arraysAreEqual(new int[] { 1, 2 }, t.topKFrequent(new int[] { 1, 1, 1, 2, 2, 3 }, 2), "C1");
        Helpers.arraysAreEqual(new int[] { 1 }, t.topKFrequent(new int[] { 1 }, 1), "C2");
    }
}