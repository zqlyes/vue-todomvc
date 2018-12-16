(function (window) {
	'use strict';

	 
	const vm = new Vue({
		el: '.todoapp',
		data: {
			list:[
				{id:1, name:'zhangsan',completed:true},
				{id:2, name:'lisi', completed: false},
				{id:3, name:'jack', completed: false},
			],
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
		}

	})
	  
	
})(window);
