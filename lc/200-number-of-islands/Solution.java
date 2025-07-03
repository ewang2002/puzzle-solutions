class Solution {
    public int numIslands(char[][] grid) {
        var numIslands = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '0') {
                    continue;
                }

                explore(grid, i, j);
                numIslands++;
            }
        }

        return numIslands;
    }

    public void explore(char[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length) {
            return;
        }

        if (j < 0 || j >= grid[0].length) {
            return;
        }

        if (grid[i][j] == '0') {
            return;
        }

        grid[i][j] = '0';
        explore(grid, i, j + 1);
        explore(grid, i, j - 1);
        explore(grid, i + 1, j);
        explore(grid, i - 1, j);
    }

    public static final char[][] GRID1 = new char[][] {
            { '1', '1', '1', '1', '0' },
            { '1', '1', '0', '1', '0' },
            { '1', '1', '0', '0', '0' },
            { '0', '0', '0', '0', '0' }
    };

    public static final char[][] GRID2 = new char[][] {
            { '1', '1', '0', '0', '0' },
            { '1', '1', '0', '0', '0' },
            { '0', '0', '1', '0', '0' },
            { '0', '0', '0', '1', '1' }
    };

    public static void main(String[] args) {
        var t = new Solution();
        Helpers.assertEquals(t.numIslands(GRID1), 1, "One-Island Test");
        Helpers.assertEquals(t.numIslands(GRID2), 3, "Three-Island Test");
    }
}