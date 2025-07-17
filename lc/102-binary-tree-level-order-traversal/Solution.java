import java.util.*;

public class Solution {
    /**
     * @param node The node whose value we want to add. This may or may not be null.
     * @param level The level that this node is at relative to the root.
     * @param order A list of list of nodes where the level is determined by the list index.
     */
    public void explore(TreeNode node, int level, List<List<Integer>> order) {
        if (node == null) {
            return;
        }

        if (order.size() == level) {
            order.add(new ArrayList<Integer>());
        }

        order.get(level).add(node.val);
        explore(node.left, level + 1, order);
        explore(node.right, level + 1, order);
    }

    public List<List<Integer>> levelOrder(TreeNode root) {
        var ordering = new ArrayList<List<Integer>>();
        explore(root, 0, ordering);
        return ordering;
    }
}