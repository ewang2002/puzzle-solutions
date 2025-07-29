import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.PriorityQueue;

class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        var graph = new HashMap<Integer, List<MyNode>>();
        for (int[] time : times) {
            int u = time[0];
            int v = time[1];
            int w = time[2];
            if (!graph.containsKey(u)) {
                graph.put(u, new ArrayList<>());
            }

            graph.get(u).add(new MyNode(v, w));
        }

        var seenNode = new HashSet<Integer>();
        var pq = new PriorityQueue<MyNode>((a, b) -> {
            return a.cost - b.cost;
        });

        int highest = 0;
        pq.add(new MyNode(k, 0));
        while (!pq.isEmpty()) {
            var curr = pq.poll();
            if (seenNode.contains(curr.node)) {
                continue;
            }

            seenNode.add(curr.node);
            // consider each neighbor
            if (graph.containsKey(curr.node)) {
                for (MyNode neighbor : graph.get(curr.node)) {
                    pq.add(new MyNode(neighbor.node, curr.cost + neighbor.cost));
                }
            }
            
            highest = Math.max(curr.cost, highest);
        }

        return seenNode.size() == n ? highest : -1;
    }

    public static void main(String[] args) {
        var s = new Solution();
        System.out.println(s.networkDelayTime(new int[][] { new int[] {2, 1, 1}, new int[] {2, 3, 1}, new int[] {3, 4, 1}}, 4, 2));
        System.out.println(s.networkDelayTime(new int[][] { new int[] {1, 2, 1}}, 2, 1));
        System.out.println(s.networkDelayTime(new int[][] { new int[] {1, 2, 1}}, 2, 2));
    }
}

class MyNode {
    public int node;
    public int cost;

    public MyNode(int node, int cost) {
        this.node = node;
        this.cost = cost;
    }
}