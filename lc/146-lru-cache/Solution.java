import java.util.HashMap;

class MyNode {
    public int val;
    public MyNode prev;
    public MyNode next;

    MyNode(int val) {
        this.val = val;
    }

    @Override
    public String toString() {
        if (this.next == null) {
            return "" + this.val;
        }
        
        return this.val + " -> [" + this.next.toString() + "]";
    }
}

class MyLinkedList {
    private MyNode _node;
    private MyNode _last;
    private int _capacity;

    public MyLinkedList(int capacity) {
        this._node = new MyNode(0);
        this._last = this._node.next;
        this._capacity = capacity;
    }

    public void append(int val) {
        // get current last node
        var node = this._node;
        while (node.next != null) {
            node = node.next;
        }

        node.next = new MyNode(val);
        node.next.prev = node;
        this._last = node.next;
    }

    public int removeFirst() {
        // get first node
        var nodeToRemove = this._node.next;
        if (nodeToRemove == null) {
            return -1;
        }

        this._node.next = this._node.next.next;
        return nodeToRemove.val;
    }

    public void moveToEnd(int val) {
        if (this._capacity == 1) {
            return;
        }

        // search for the val
        var isFound = false;
        var node = this._node.next;
        while (node != null) {
            if (node.val == val) {
                isFound = true;
                break;
            }

            node = node.next;
        }

        if (!isFound) {
            return;
        }

        var prevNode = node.prev;
        var nextNode = node.next;
        prevNode.next = nextNode;
        if (node.next != null)
            nextNode.prev = prevNode;

        var oldLast = _last;
        _last = node;
        _last.prev = oldLast;
        _last.next = null;
        oldLast.next = _last; 
    }

    @Override
    public String toString() {
        return this._node.next == null ? "[]" : this._node.next.toString();
    }
}

class LRUCache {
    public HashMap<Integer, Integer> _map;
    public MyLinkedList _list;
    private int _capacity;

    public LRUCache(int capacity) {
        this._capacity = capacity;
        this._map = new HashMap<>();
        this._list = new MyLinkedList(capacity);
    }
    
    public int get(int key) {
        if (this._map.containsKey(key)) {
            this._list.moveToEnd(key);
            return this._map.get(key);
        }

        return -1;
    }
    
    public void put(int key, int value) {
        if (this._map.containsKey(key)) {
            this._list.moveToEnd(key);
            this._map.put(key, value);
            return;
        }

        if (this._map.size() + 1 > this._capacity) {
            // remove recently used key
            var lru = this._list.removeFirst();
            this._map.remove(lru);
        }
        
        this._map.put(key, value);
        this._list.append(key);
    }
}

public class Solution {
    public static void main(String[] args) {
        var c = new LRUCache(2);
        c.put(1, 1);
        c.put(2, 2);
        System.out.println(c.get(1));
        c.put(3, 3);
        System.out.println(c.get(2));
        c.put(4, 4);
        System.out.println(c.get(1));
        System.out.println(c.get(3));
        System.out.println(c.get(4));

        System.out.println("===================");
        var d = new LRUCache(1);
        d.put(2, 1);
        System.out.println(d.get(2));
        d.put(3, 2);
        System.out.println(d.get(2));
        System.out.println(d.get(3));

        System.out.println("===================");
        var e = new LRUCache(2);
        e.put(2, 1);
        e.put(2, 2);
        System.out.println(e.get(2));
        e.put(1, 1);
        e.put(4, 1);
        System.out.println(e.get(2));
    }
}
