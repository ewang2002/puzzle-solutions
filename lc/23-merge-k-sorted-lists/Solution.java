class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        var finalNode = new ListNode();
        var toReturn = finalNode;
        while (true) { // O(len(lists[0]) + len(lists[1]) + ... + len(lists[n]))
            int nodeIdxToPick = -1;
            int smallest = Integer.MAX_VALUE;
            for (int i = 0; i < lists.length; i++) { // O(max(lengths of lists))
                if (lists[i] == null) {
                    continue;
                }

                if (lists[i].val < smallest) {
                    smallest = lists[i].val;
                    nodeIdxToPick = i;
                }
            }

            if (nodeIdxToPick == -1) {
                break;
            }

            finalNode.next = new ListNode(smallest);
            finalNode = finalNode.next;

            lists[nodeIdxToPick] = lists[nodeIdxToPick].next;
        }

        return toReturn.next;
    }

    public static void main(String[] args) {
        var o = new Solution();

        var l1 = ListNode.createListNodeFromArray(1, 4, 5);
        var l2 = ListNode.createListNodeFromArray(1, 3, 4);
        var l3 = ListNode.createListNodeFromArray(2, 6);
        Helpers.arraysAreEqual(new int[] { 1, 1, 2, 3, 4, 4, 5, 6 },
                ListNode.createArrayFromListNode(o.mergeKLists(new ListNode[] { l1, l2, l3 })), "T1");
        Helpers.arraysAreEqual(new int[0], ListNode.createArrayFromListNode(o.mergeKLists(new ListNode[0])), "T2");
        Helpers.arraysAreEqual(new int[0],
                ListNode.createArrayFromListNode(o.mergeKLists(new ListNode[] { null })), "T3");
    }
}