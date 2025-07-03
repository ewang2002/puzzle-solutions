import java.util.ArrayList;
import java.util.List;

class ListNode {
    int val;
    ListNode next;

    ListNode() {
    }

    ListNode(int val) {
        this.val = val;
    }

    ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }

    static ListNode createListNodeFromArray(int... arr) {
        var n = new ListNode();
        var head = n;
        for (var elem : arr) {
            n.next = new ListNode(elem);
            n = n.next;
        }

        return head.next;
    }

    static int[] createArrayFromListNode(ListNode n) {
        var l = new ArrayList<Integer>();
        while (n != null) {
            l.add(n.val);
            n = n.next;
        }

        return l.stream().mapToInt(Integer::intValue).toArray();
    }

    @Override
    public String toString() {
        if (this.next == null) {
            return "" + this.val;
        }
        
        return this.val + " -> [" + this.next.toString() + "]";
    }
}

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}