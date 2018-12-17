(function (window) {
	'use strict';
	
	let list = JSON.parse(localStorage.getItem('todolist')) || [];
	 
	const vm = new Vue({
		el: '.todoapp',
		data: {
			list,
			todoMsg: '',
		  clickId: -1
		},
		methods:{
			addTodo(){
				this.list.unshift({
					id: +new Date(),
					name: this.todoMsg,
					completed: false
				})
				this.todoMsg = ''
			},
			delTodo(id){
				let index = this.list.findIndex(item => item.id == id)
				this.list.splice(index,1);
			},
			showEdit(id){
        this.clickId = id
			},
			updateTodo(){
				this.clickId = -1;
			},
			clearTodos(){
				this.list = this.list.filter(item => !item.completed)
			}
		},
		computed:{
			leftCount(){
				return this.list.filter(item => !item.completed).length
			},
			isShowClear(){
				return this.list.some(item => item.completed)
			}
		},
		watch:{
			list:{
				handler(value){
          localStorage.setItem('todolist',JSON.stringify(value))
				},
				deep: true,
			}
		}

	})
	  
	
})(window);
