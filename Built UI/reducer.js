import storage from "./util/storage.js";
const init = {
	todos: storage.get(),
	filter: 'all',
	filters: {
		all: ()=> true,
		active: todo => !todo.completed,
		completed: todo => todo.completed
	},
	endEdit: null
};
// cach1:
// export default function reducer(state = init, action, args){
// 	switch(action){
// 		case 'add':
// 			const [title]= args
// 			return {
// 				...state,
// 				todos: [...state.todos,{
// 					title,
// 					completed: false
// 				}]
// 			}
// 		default:
// 			return state
// 	}
// }

//cach2:

const actions = {
	add({todos}, title){
		if(title){
			todos.push({title, completed: false})
			storage.set(todos)
		}
	
	},
	toggle({todos}, index){
		const todo = todos[index];
		todo.completed = !todo.completed
		storage.set(todos)
	},
	toggleAll({todos}, completed){
		todos.forEach(todo=> todo.completed = completed)
		storage.set(todos)
	},
	destroy({todos}, index){
		todos.splice(index, 1)
		storage.set(todos)
	},
	swapFilter(state, filter){
		state.filter = filter;
	},
	clearCompleted(state){
		state.todos =state.todos.filter(state.filters.active)
		storage.set(state.todos)
	},
	startEdit(state, index){
		state.endEdit = index;
	},
	saveIndex(state, title){
		if(state.endEdit !== null){
			if(title){
				state.todos[state.endEdit].title = title;
				storage.set(state.todos)
			}else{
				this.destroy(state, state.endEdit);
			}
			state.endEdit = null;
		}
	},
	cancel(state){
		state.endEdit = null;
	}
}


export default function reducer(state = init, action, args){
	actions[action] && actions[action](state, ...args);
	return state
}