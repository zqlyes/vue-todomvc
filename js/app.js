(function (window) {
	'use strict';
	
	// let list = JSON.parse(localStorage.getItem('todolist')) || [];
	 
	const vm = new Vue({
		el: '.todoapp',
		data: {
			list: [],
			todoMsg: '',
			clickId: -1,
		  url: "http://localhost:3000/list/",
		},
		methods:{
			// 渲染数据的方法
			getTodolist(){
        axios({
					method: 'get',
					url: this.url
				}).then(res => {
					this.list = res.data
				})
			},

		  // 添加一条数据的方法
			addTodo(){
				// 方法一：本地数据添加
				// this.list.unshift({
				// 	id: +new Date(),
				// 	name: this.todoMsg,
				// 	completed: false
				// })
			 
				// 方法二：利用axios在数据库中增加一条数据
				axios({
					method: 'post',
					url: this.url,
					data:{
						name: this.todoMsg,
						completed: false
					}
				}).then(res => { 
					console.log('添加完成');
					this.getTodolist()
				  this.todoMsg = ''					
				})
			},

			// 删除一条数据
			delTodo(id){
				// 方法一：本地数据删除
				// let index = this.list.findIndex(item => item.id == id)
				// this.list.splice(index,1);
				 
				// 方法二：利用axios从数据库中删除一条数据
				axios({
					method: 'delete',
					url: this.url + id
				}).then(res => {
					console.log('删除成功')
					this.getTodolist()
				})
			},
			 
			// 修改数据状态
      updateState(id,state){
        axios({
					method: 'patch',
					url: this.url + id,
					data: {
						completed: state,
					}
				}).then(res => {
					console.log('修改状态成功')
					this.getTodolist()
				})
			},

			// 展示编辑框
			showEdit(id){
        this.clickId = id
			},

			//修改数据任务
			updateTodo(id,name){
				// this.clickId = -1
				axios({
					method: 'patch',
					url: this.url + id,
					data:{
					  name,
					}
				}).then(res => {
					console.log("修改任务成功")
					this.getTodolist()
				  this.clickId = -1					
				})
			},

      // 清除已完成的任务
			clearTodos(){
				// 方法一：本地数据的清除方式
				// this.list = this.list.filter(item => !item.completed)

				// 方法二：利用axios在数据库中清空数据
				this.list.filter(item => item.completed).forEach(item => this.delTodo(item.id))

			}
		},

		computed:{
			//统计未完成任务的个数
			leftCount(){
				return this.list.filter(item => !item.completed).length
			},

		  //判断是否有已完成任务
			isShowClear(){
				return this.list.some(item => item.completed)
			},

			// 判断是否有数据
			isShowFooter(){
				return this.list.length > 0
			}
		},

		watch:{
			// 监听list数据
			list:{
				handler(value){
          // localStorage.setItem('todolist',JSON.stringify(value))
				},
				deep: true,
			}
		},

		created(){
			this.getTodolist()
		}

	})
	  
	
})(window);
