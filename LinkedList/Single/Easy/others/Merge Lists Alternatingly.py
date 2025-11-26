class Solution:
    def merge_list(self, head1, head2):
        # code here
        
        p1 = head1
        p2 = head2
        
        while p1 and p2:
            #print(p1.data, p2.data)
            nxt = p1.next
            nxt1 = p2.next
            p1.next = p2
            p2.next = nxt
            
            p1 = nxt
            p2 = nxt1
            
        return [head1, p2]
