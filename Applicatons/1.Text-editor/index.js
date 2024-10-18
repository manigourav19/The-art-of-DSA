class Stack{
    arr_undo=[]
    arr_redo=[]
    buffer=4
    topelement = () =>
    {
         return this.arr_undo[this.arr_undo.length-1]
    }
    popping = () => {
        if(this.arr_undo.length!=0)
        {
            let top = this.arr_undo.pop()
            return top
        }
        return [-1,""]
    }
    
    pushing = (type,charac) => {
        if(this.arr_undo.length==0)
        {
            if(type=="inserting")
            {
                this.arr_undo.push([type,charac])
            }
        }
        else
        {
            let top = this.topelement()
            if(type===top[0] && top[1].length<this.buffer)
            {
                let st = this.popping()
                st[1] = charac + st[1];
                this.arr_undo.push([type,st[1]])
            }
            else
            {
                this.arr_undo.push([type,charac])
            }
        }
    }
    reverse = (s1) => {
        let s = "";
        let i=s1.length-1;
        while(i>=0)
        {
            s=s.concat(s1.substring(i,i+1))
            i--;
        }
        return s;
    }
}   
    
    

const textarea = document.getElementById("textarea")
const undo = document.getElementById("undo")
const redo = document.getElementById("redo")
const stack = new Stack()

textarea.addEventListener("keydown",(e) => {
    switch(e.key)
    {
        case 'Backspace': stack.pushing("deleting",textarea.value.substring(textarea.value.length-1,textarea.value.length));
        break;
        default : stack.pushing("inserting",e.key);
    }
})

undo.addEventListener("click",() => {
    let temp = stack.popping();
    if(temp[0]!=-1)
    {
        stack.arr_redo.push([temp[0],temp[1]])
        if(temp[0]=="inserting")
        {
            let templen = temp[1].length
            textarea.value =  textarea.value.substring(0,textarea.value.length-templen)
        }
        else
        {
            textarea.value+=temp[1]
        }
    }
})

redo.addEventListener("click",() => {
    let temp = stack.arr_redo.pop();
        if(temp[0]=="inserting")
        {
            let s = stack.reverse(temp[1])
            textarea.value+=s
            stack.pushing("inserting",temp[1])
        }
        else
        {
            let templen = temp[1].length
            stack.pushing("deleting", temp[1])
            textarea.value =  textarea.value.substring(0,textarea.value.length-templen)
        }
})