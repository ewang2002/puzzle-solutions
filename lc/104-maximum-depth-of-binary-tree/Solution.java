import java.util.Stack;

public class Solution {
    public int maxDepth(TreeNode root) {
        return calculateHeight(root, 0);
    }

    public int calculateHeight(TreeNode node, int height) {
        if (node == null) {
            return height;
        }

        return Math.max(calculateHeight(node.left, height + 1), calculateHeight(node.right, height + 1));
    }

    /*
     * public int calculateHeightIterative(TreeNode node) {
     * var h = new Stack<Integer>();
     * var n = new Stack<TreeNode>();
     * 
     * h.push(0);
     * n.push(node);
     * 
     * int maxHeight = 0;
     * while (!h.empty()) {
     * var thisNode = n.pop();
     * var height = h.pop();
     * if (thisNode == null) {
     * maxHeight = Math.max(maxHeight, height);
     * continue;
     * }
     * 
     * h.push(height + 1);
     * h.push(height + 1);
     * n.push(thisNode.left);
     * n.push(thisNode.right);
     * }
     * 
     * return maxHeight;
     * }
     */

    public static void main(String[] args) {
        var s = new Solution();

        var node = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
        Helpers.assertEquals(3, s.maxDepth(node), "Test 1");
    }
}