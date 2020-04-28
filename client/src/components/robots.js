const robots

fetch("http://localhost:9000/menu")
	.then(res => robots = res)
	.catch(err => err);

export robots;
// export const robots = [
// 	{
// 		id: 1,
// 		name: 'Pizza',
// 		detail: 'A PIZZA SLICE A DAY KEEPS SADNESS AWAY.',
// 		price: 349
// 	},
// 	{
// 		id: 2,
// 		name: 'Pasta',
// 		detail: 'Life is a combination of magic and PASTA.',
// 		price: 299
// 	},
// 	{
// 		id: 3,
// 		name: 'ButterChicken',
// 		detail: 'Chicken is a bird, Butter Chicken is a way of life.',
// 		price: 399
// 	},
// 	{
// 		id: 4,
// 		name: 'Noodles',
// 		detail: 'Noodles are not only amusing but delicious.',
// 		price: 299
// 	},
// 	{
// 		id: 5,
// 		name: 'Noodles',
// 		detail: 'Noodles are not only amusing but delicious.',
// 		price: 299
// 	},
// 	{
// 		id: 6,
// 		name: 'Noodles',
// 		detail: 'Noodles are not only amusing but delicious.',
// 		price: 299
// 	},
// ]