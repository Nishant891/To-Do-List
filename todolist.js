            //Model
            const container=document.getElementById('child');
            let todo;
            const savedTodos=JSON.parse(localStorage.getItem('todo'));
            if (Array.isArray(savedTodos)){
                todo=savedTodos;
                add();
            }
            else {
                todo=[];
            };           
            function createTodo(){
                const title=document.getElementById('todoTitle').value;
                const date=document.getElementById('datePicker').value;
                const id= new Date().getTime();
                todo.push({title:title,date:date,id:id,isDone:false,isEditing:false});
                add();
            };
            //View
            function add(){
                container.innerHTML="";
                todo.forEach(function(todo){
                    const x=document.createElement('div');
                    const rs = document.createElement('div')
                    const ls = document.createElement('div')                   
                    x.className = 'tasks';
                    const editBtn=document.createElement('button');
                    const deleteBtn=document.createElement('button');
                    const checkbox=document.createElement('input');
                    checkbox.type='checkbox';
                    checkbox.style="padding-top:2px;"
                    checkbox.id=todo.id;
                    checkbox.onchange=check;
                    if(todo.isDone==true){
                        checkbox.checked=true;
                    }
                    else{
                        checkbox.checked=false;
                    }
                    deleteBtn.innerText="Delete";
                    deleteBtn.id=todo.id;
                    deleteBtn.onclick=deleteTodo;
                    editBtn.innerText="Edit";
                    editBtn.style="margin-right:6px";
                    editBtn.id=todo.id;
                    editBtn.onclick=edit;
                    x.style="margin-top:6px"
                    if(todo.isEditing==true){
                        const updateTitle=document.createElement('input');
                        const updateDatepicker=document.createElement('input');
                        updateDatepicker.type='date';
                        const updateButton=document.createElement('button');
                        updateButton.innerText="Update";
                        updateTitle.style="margin-right:4px;"
                        updateDatepicker.style="margin-right:4px;"
                        updateButton.id=todo.id;
                        updateTitle.id=todo.id+1;
                        updateDatepicker.id=todo.id+2;
                        updateButton.onclick=update;
                        x.appendChild(updateTitle);
                        x.appendChild(updateDatepicker);
                        x.appendChild(updateButton);
                        container.appendChild(x);
                    }
                    else{
                        ls.innerHTML = todo.title + " : " + todo.date;   
                        ls.className = 'contents';
                        rs.appendChild(editBtn);
                        rs.appendChild(deleteBtn);
                        rs.className = 'btns';
                        ls.prepend(checkbox);
                        x.appendChild(ls);
                        x.appendChild(rs);
                        container.appendChild(x);
                    }
                });
                document.getElementById('todoTitle').value="";
                saveTodos();
            };
            function saveTodos(){
                localStorage.setItem('todo',JSON.stringify(todo));
            }
            //Controller
            function deleteTodo(event){
                const deleteBtnid=event.target.id;
                todo=todo.filter(function(del){
                    if(del.id==deleteBtnid){
                        return false;
                    }
                    else{
                        return true;
                    }
                });
                add();
                saveTodos();
            };
            function check(event){
                const checkbox=event.target;
                const checkboxId=checkbox.id;
                const checked=checkbox.checked;
                toggleTodo(checkboxId,checked);
                add();
                saveTodos();
            };
            function toggleTodo(checkboxId,checked){
                todo.forEach(function(chk){
                    if(chk.id==checkboxId){
                        chk.isDone=checked;
                    }
                });
            }
            function edit(event){
                const editBtnid=event.target.id;
                todo.forEach(function (todo){
                    if(todo.id==editBtnid){
                        todo.isEditing=true;
                    }
                });
                add();
            };
            function update(event){
                const updateButtonid=event.target.id;
                todo.forEach(function (todo){
                    if(todo.id==updateButtonid){
                        const updatetitleid=todo.id+1;
                        const updatedatepickerid=todo.id+2;
                        const newTitle=document.getElementById(updatetitleid).value;
                        const newDate=document.getElementById(updatedatepickerid).value;
                        todo.title=newTitle;
                        todo.date=newDate;
                        todo.isEditing=false;
                    };
                });
                add();
            }