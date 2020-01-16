{
	const exemplo = function(){
		return this.attr;
	}


const obj_apply = {attr: 'valor com o apply'}; 
const obj_call = {attr: 'valor com o call'};
console.log(exemplo.apply(obj_apply));
console.log(exemplo.call(obj_call));
/* a diferencao entre o apply e call eh a forma de passar outros parametros alem do this, um deles se passa por array e o outro se passa separado por virgulas */
}
