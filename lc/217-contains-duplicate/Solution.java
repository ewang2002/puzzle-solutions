import java.util.HashSet;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        var s = new HashSet<Integer>();
        for (int n : nums) {
            s.add(n);
        }

        return s.size() != nums.length;
    }

    public static void main(String[] args) {
        var t = new Solution();
        Helpers.assertEquals(t.containsDuplicate(new int[] { 1, 2, 3, 1 }), true, "Duplicate Case");
        Helpers.assertEquals(t.containsDuplicate(new int[] { 1, 2, 3, 4 }), false, "No Duplicate Case");
    }
}