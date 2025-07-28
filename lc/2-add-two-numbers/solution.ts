class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let resultingNode = new ListNode();
    const toReturn = resultingNode;

    let carry = 0;
    while (true) {
        if (l1 === null && l2 === null) {
            break;
        }

        const val1 = l1?.val ?? 0;
        const val2 = l2?.val ?? 0;
        let sum = val1 + val2 + carry;
        if (sum >= 10) {
            carry = 1;
            sum = sum - 10;
        }
        else {
            carry = 0;
        }

        resultingNode.next = new ListNode(sum);
        resultingNode = resultingNode.next;

        if (l1 !== null) {
            l1 = l1.next;
        }

        if (l2 !== null) {
            l2 = l2.next;
        }
    }

    if (carry !== 0) {
        resultingNode.next = new ListNode(carry);
    }

    return toReturn.next;
};

console.log(JSON.stringify(addTwoNumbers(new ListNode(2, new ListNode(4, new ListNode(3))), new ListNode(5, new ListNode(6, new ListNode(4))))));