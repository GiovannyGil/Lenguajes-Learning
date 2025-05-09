'use strict';

var datos = {
	fotos: {
		america: [
			{
				id: 1,
				nombre: 'America 1',
				descripcion:
					'America 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/america/1.jpg',
			},
			{
				id: 2,
				nombre: 'America 2',
				descripcion:
					'America 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/america/2.jpg',
			},
			{
				id: 3,
				nombre: 'America 3',
				descripcion:
					'America 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/america/3.jpg',
			},
			{
				id: 4,
				nombre: 'America 4',
				descripcion:
					'America 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/america/4.jpg',
			},
			{
				id: 5,
				nombre: 'America 5',
				descripcion:
					'America 5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/america/5.jpg',
			},
			{
				id: 6,
				nombre: 'America 6',
				descripcion:
					'America 6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/america/6.jpg',
			},
			{
				id: 7,
				nombre: 'America 7',
				descripcion:
					'America 7 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/america/7.jpg',
			},
			{
				id: 8,
				nombre: 'America 8',
				descripcion:
					'America 8 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/america/8.jpg',
			},
			{
				id: 9,
				nombre: 'America 9',
				descripcion:
					'America 9 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/america/9.jpg',
			},
			{
				id: 10,
				nombre: 'America 10',
				descripcion:
					'America 10 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/america/10.jpg',
			},
		],
		europa: [
			{
				id: 11,
				nombre: 'Europa 1',
				descripcion:
					'Europa 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/europa/1.jpg',
			},
			{
				id: 12,
				nombre: 'Europa 2',
				descripcion:
					'Europa 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/europa/2.jpg',
			},
			{
				id: 13,
				nombre: 'Europa 3',
				descripcion:
					'Europa 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/europa/3.jpg',
			},
			{
				id: 14,
				nombre: 'Europa 4',
				descripcion:
					'Europa 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/europa/4.jpg',
			},
			{
				id: 15,
				nombre: 'Europa 5',
				descripcion:
					'Europa 5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/europa/5.jpg',
			},
			{
				id: 16,
				nombre: 'Europa 6',
				descripcion:
					'Europa 6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/europa/6.jpg',
			},
			{
				id: 17,
				nombre: 'Europa 7',
				descripcion:
					'Europa 7 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/europa/7.jpg',
			},
			{
				id: 18,
				nombre: 'Europa 8',
				descripcion:
					'Europa 8 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/europa/8.jpg',
			},
			{
				id: 19,
				nombre: 'Europa 9',
				descripcion:
					'Europa 9 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/europa/9.jpg',
			},
			{
				id: 20,
				nombre: 'Europa 10',
				descripcion:
					'Europa 10 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/europa/10.jpg',
			},
		],

		africa: [
			{
				id: 21,
				nombre: 'África 1',
				descripcion:
					'África 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/africa/1.jpg',
			},
			{
				id: 22,
				nombre: 'África 2',
				descripcion:
					'África 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/africa/2.jpg',
			},
			{
				id: 23,
				nombre: 'África 3',
				descripcion:
					'África 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/africa/3.jpg',
			},
			{
				id: 24,
				nombre: 'África 4',
				descripcion:
					'África 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/africa/4.jpg',
			},
			{
				id: 25,
				nombre: 'África 5',
				descripcion:
					'África 5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/africa/5.jpg',
			},
			{
				id: 26,
				nombre: 'África 6',
				descripcion:
					'África 6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/africa/6.jpg',
			},
			{
				id: 27,
				nombre: 'África 7',
				descripcion:
					'África 7 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/africa/7.jpg',
			},
			{
				id: 28,
				nombre: 'África 8',
				descripcion:
					'África 8 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/africa/8.jpg',
			},
			{
				id: 29,
				nombre: 'África 9',
				descripcion:
					'África 9 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/africa/9.jpg',
			},
			{
				id: 30,
				nombre: 'África 10',
				descripcion:
					'África 10 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/africa/10.jpg',
			},
		],
		asia: [
			{
				id: 31,
				nombre: 'Asia 1',
				descripcion:
					'Asia 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/asia/1.jpg',
			},
			{
				id: 32,
				nombre: 'Asia 2',
				descripcion:
					'Asia 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/asia/2.jpg',
			},
			{
				id: 33,
				nombre: 'Asia 3',
				descripcion:
					'Asia 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/asia/3.jpg',
			},
			{
				id: 34,
				nombre: 'Asia 4',
				descripcion:
					'Asia 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/asia/4.jpg',
			},
			{
				id: 35,
				nombre: 'Asia 5',
				descripcion:
					'Asia 5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/asia/5.jpg',
			},
			{
				id: 36,
				nombre: 'Asia 6',
				descripcion:
					'Asia 6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/asia/6.jpg',
			},
			{
				id: 37,
				nombre: 'Asia 7',
				descripcion:
					'Asia 7 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/asia/7.jpg',
			},
			{
				id: 38,
				nombre: 'Asia 8',
				descripcion:
					'Asia 8 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/asia/8.jpg',
			},
			{
				id: 39,
				nombre: 'Asia 9',
				descripcion:
					'Asia 9 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/asia/9.jpg',
			},
			{
				id: 40,
				nombre: 'Asia 10',
				descripcion:
					'Asia 10 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/asia/10.jpg',
			},
		],
		oceania: [
			{
				id: 41,
				nombre: 'Oceania 1',
				descripcion:
					'Oceania 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/oceania/1.jpg',
			},
			{
				id: 42,
				nombre: 'Oceania 2',
				descripcion:
					'Oceania 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/oceania/2.jpg',
			},
			{
				id: 43,
				nombre: 'Oceania 3',
				descripcion:
					'Oceania 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/oceania/3.jpg',
			},
			{
				id: 44,
				nombre: 'Oceania 4',
				descripcion:
					'Oceania 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/oceania/4.jpg',
			},
			{
				id: 45,
				nombre: 'Oceania 5',
				descripcion:
					'Oceania 5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/oceania/5.jpg',
			},
			{
				id: 46,
				nombre: 'Oceania 6',
				descripcion:
					'Oceania 6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/oceania/6.jpg',
			},
			{
				id: 47,
				nombre: 'Oceania 7',
				descripcion:
					'Oceania 7 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/oceania/7.jpg',
			},
			{
				id: 48,
				nombre: 'Oceania 8',
				descripcion:
					'Oceania 8 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/oceania/8.jpg',
			},
			{
				id: 49,
				nombre: 'Oceania 9',
				descripcion:
					'Oceania 9 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/oceania/9.jpg',
			},
			{
				id: 50,
				nombre: 'Oceania 10',
				descripcion:
					'Oceania 10 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/oceania/10.jpg',
			},
		],
		antartida: [
			{
				id: 51,
				nombre: 'Antártida 1',
				descripcion:
					'Antártida 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/antartida/1.jpg',
			},
			{
				id: 52,
				nombre: 'Antártida 2',
				descripcion:
					'Antártida 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/antartida/2.jpg',
			},
			{
				id: 53,
				nombre: 'Antártida 3',
				descripcion:
					'Antártida 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/antartida/3.jpg',
			},
			{
				id: 54,
				nombre: 'Antártida 4',
				descripcion:
					'Antártida 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/antartida/4.jpg',
			},
			{
				id: 55,
				nombre: 'Antártida 5',
				descripcion:
					'Antártida 5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/antartida/5.jpg',
			},
			{
				id: 56,
				nombre: 'Antártida 6',
				descripcion:
					'Antártida 6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/antartida/6.jpg',
			},
			{
				id: 57,
				nombre: 'Antártida 7',
				descripcion:
					'Antártida 7 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/antartida/7.jpg',
			},
			{
				id: 58,
				nombre: 'Antártida 8',
				descripcion:
					'Antártida 8 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/antartida/8.jpg',
			},
			{
				id: 59,
				nombre: 'Antártida 9',
				descripcion:
					'Antártida 9 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id enim ac diam consectetur vulputate eget in magna. Sed fermentum, sapien nec vulputate bibendum, urna neque eleifend leo, at porta diam risus non ligula. Nulla ac venenatis augue. Morbi lobortis libero sit amet justo cursus, iaculis ultricies sapien lacinia.',
				ruta: './img/antartida/9.jpg',
			},
		],
	},
};

const { fotos } = datos;

var dataCategorias = {
	categorias: [
		{ id: 'america', nombre: 'America', numeroFotos: fotos['america'].length, imagenPortada: './img/america.jpg' },
		{ id: 'europa', nombre: 'Europa', numeroFotos: fotos['europa'].length, imagenPortada: './img/europa.jpg' },
		{ id: 'africa', nombre: 'África', numeroFotos: fotos['africa'].length, imagenPortada: './img/africa.jpg' },
		{ id: 'asia', nombre: 'Asia', numeroFotos: fotos['asia'].length, imagenPortada: './img/asia.jpg' },
		{ id: 'oceania', nombre: 'Oceania', numeroFotos: fotos['oceania'].length, imagenPortada: './img/oceania.jpg' },
		{
			id: 'antartida',
			nombre: 'Antártida',
			numeroFotos: fotos['antartida'].length,
			imagenPortada: './img/antartida.jpg',
		},
	],
};

console.log('Cargando CargarCategorias.js...');
// ver la data de categorias por consola
console.log(dataCategorias);


const {categorias} = dataCategorias; // destructuring -> extraer la propiedad categorias de dataCategorias
console.log(categorias); // ver categorias por consola

const contenedorCategorias$1 = document.getElementById('categorias');

categorias.forEach((categoria) => {
    // crear un elemento por cada categoria
    const NuevaCategoria = document.createElement('a');

    // definir una plantilla
    const plantilla = `
            <img class="categoria__img" src="${categoria.imagenPortada}" alt="" />
			<div class="categoria__datos">
				<p class="categoria__nombre">${categoria.nombre}</p>
				<p class="categoria__numero-fotos">${categoria.numeroFotos} Fotos</p>
			</div>
        `;

        // agregar la plantilla al elemento
        NuevaCategoria.innerHTML = plantilla;
        // agregar los atrtiutos al elemento
        NuevaCategoria.classList.add('categoria'); // agregar una clase
        NuevaCategoria.href = '#'; // agregar un enlace
        NuevaCategoria.dataset.categoria = categoria.id; // agregar un atributo personalizado

        // agregar el elemento al contenedor -> agregar plantilla al DOM
        contenedorCategorias$1.append(NuevaCategoria);


});

const galeria$4 = document.getElementById('galeria'); // seleccionar/acceder la seccion de galeria


const cargarImagen = (id, nombre, ruta, descripcion) => {
    // acceder a la galeria
    galeria$4.querySelector('.galeria__imagen').src = ruta; // agregar la ruta de la imagen
    galeria$4.querySelector('.galeria__imagen').dataset.idImagen = id; // agregar el id de la imagen, como un atributo personalizado
    // acceder al titulo
    galeria$4.querySelector('.galeria__titulo').innerText = nombre; // agregar el nombre de la imagen
    // acceder a la descripcion
    galeria$4.querySelector('.galeria__descripcion-imagen-activa').innerText = descripcion; // agregar la descripcion de la imagen


    // Eliminamos la clase active de cualquier slide.
	galeria$4.querySelectorAll('.galeria__carousel-slide--active').forEach((elemento) => {
		elemento.classList.remove('galeria__carousel-slide--active');
	});

    // obtener la categoria actual (de la imagen)
    const categoriaActual = galeria$4.dataset.categoria;
    // acceder a las fotos de la categoria actual
    const fotos = datos.fotos[categoriaActual];
    // obtener el indice de la imagen actual
    let indexImgActual;
    fotos.forEach((foto, index) => {
        // comprobar si el id de la foto es igual al id de la imagen actual
        if(foto.id === id){
            indexImgActual = index;
        }
    });


    
    // obtener los elementos del carrusel (clase seleccionada)
    // si el slie es mayor a 0, ejecutar el siguiente codigo
    if(galeria$4.querySelectorAll('.galeria__carrusel-slide').length > 0){
        // imagen activa, eliminar la clase activa, de cualquier slide que la tenga
        galeria$4.querySelector('.galeria__carrusel-slide--active').classList.remove('galeria__carrusel-slide--active');

        // dar el border a la imagen activa
        galeria$4.querySelectorAll('.galeria__carrusel-slide')[indexImgActual].classlist.add('galeria__carrusel-slide--active');
    }
};

// cargar la imagen anterior o siguiente, en la galeria dependiendo de la direccion(click al boton)
const CargarAnteriorSiguienteImagen = (direccion) => {
    const categoriaActual = galeria$4.dataset.categoria; // obtener la categoria actual
    const fotos = datos.fotos[categoriaActual]; // obtener las fotos de la categoria actual
    const idImagenActual = parseInt(galeria$4.querySelector('.galeria__imagen').dataset.idImagen); // obtener el id de la imagen actual

    // recorrer las imagenes hasta encontrar la imagen actual y obtener su posicion(index)
    let indexImagenActual;
    fotos.forEach((foto, index) => {
        if(foto.id === idImagenActual){
            indexImagenActual = index;
            
        }
    });

    if(direccion === 'siguiente'){
        if(fotos[indexImagenActual + 1]){
            const {id, nombre, ruta, descripcion} = fotos[indexImagenActual + 1];
            cargarImagen(id, nombre, ruta, descripcion);
        }
    } else if (direccion === 'anterior'){
        if(fotos[indexImagenActual - 1]){
            const {id, nombre, ruta, descripcion} = fotos[indexImagenActual - 1];
            cargarImagen(id, nombre, ruta, descripcion);
        }
    } 
};

const contenedorCategorias = document.getElementById('categorias'); // seleccionar/acceder el contenedor de categorias

// Acceder a la seccion "galeria"
const galeria$3 = document.getElementById('galeria'); // seleccionar/acceder la seccion de galeria



// agregar un eveneto
contenedorCategorias.addEventListener('click', (e) => {
    e.preventDefault(); // prevenir el comportamiento por defecto del navegador
    console.log(e.target.closest('a')); // ver el elemento que se ha hecho click, buscando de abajo hacia arriaba, arrontrando el elemento que cumpla con la condicion. sino encuentra el elemento retorna null

    // si el elemento que se ha hecho click es un enlace, ejecuta el siguiente codigo
    if(e.target.closest('a')){
        console.log('EJECUTANDO EL CODIGO...');

        // abrir la galeria
        galeria$3.classList.add('galeria--active'); // agregar una clase al elemento, para que abra la galeria
        document.body.style.overflow = 'hidden'; // ocultar la barra de desplazamiento


        // acceder a la categoria activa, a la que se le dio click
        const categoriaActiva = e.target.closest('a').dataset.categoria;

        // acceder a la categoria y darle un atributo personalizado, que es la categoria activa
        galeria$3.dataset.categoria = categoriaActiva;

        // acceder a las fotos de la categoria activa
        const fotos = datos.fotos[categoriaActiva]; 

        // accdeder al carrucel y limpiarlo (eliminar el contenido/slides)
        const carrucel = galeria$3.querySelector('.galeria__carousel-slides');

        // acceder a la primera foto, y deestructurarla
        const {id,nombre,ruta,descripcion} = fotos[0]; // acceder a la primera foto de la categoria activa
        
        // cargar la imagen al abrir la galeria
        cargarImagen(id,nombre,ruta,descripcion); // cargar la imagen por defecto, pasarle los parametros de la primera foto

        // acceder al carrucel y dejarlo en blanco (sin contenido)
        carrucel.innerHTML = '';

        // agregar las fotos al carrusel / slide al abrir la categoria
        fotos.forEach((foto) => {
            const slides = `
                <a href="#" class="galeria__carousel-slide">
					<img class="galeria__carousel-image" src="${foto.ruta}" data-id="${foto.id}" alt="" />
				</a>
            `;

            // acceder al carrusel
            galeria$3.querySelector('.galeria__carousel-slides').innerHTML += slides; // agregar los slides al carrusel
        });

        galeria$3.querySelector('.galeria__carousel-slides').classList.add('galeria__carousel-slides--active'); // agregar una clase al carrusel para que se muestre
        
    }



});

// acceder a la galeria
const galeria$2 = document.getElementById('galeria');

const carrusel = (direccion) => {
    // manejo del carrusel -> vijilar las imegens del slide, si estan, entran o salen
    const opciones = {
        root: document.querySelector('.galeria__carousel'),
        rootMargin: '0px', // sin margenes al rededor de la galeria__carrusel (contenedor)
        threshold: 0.9, // porcentaje para considerar que la imgen esta dentro del contenedor (90% en este caso)
    };

    // obtener todos los elementos del carrusel que se estan observando
    const observer = new IntersectionObserver((entradas) => {
        // detectar los slide visibles
        const slidesvisibles = entradas.filter((entrada) => {
            // conocer con un condicional, si todos los elementos son visibles o no
            if(entrada.isIntersecting === true){
                return entrada // solo mostrar las entradas/elementos que son visibles
            }
        });

        // direccion atras o adelante
        if(direccion === 'atras'){
            // obtener el primer slide visible
            const primerSlideVisible = slidesvisibles[0];
            // conocer su index
            const indexPrimerSlideVisible = entradas.indexOf(primerSlideVisible);

            // si el index del primer slide visible es mayor a 0, entonces
            if(indexPrimerSlideVisible >= 1){
                // acceder al slide anterior, y atrastraer para ponerlo en el ultimo pues/elemento/lugar
                entradas[indexPrimerSlideVisible - 1].target.scrollIntoView(
                    {
                        behavior: 'smooth',
                        inline: 'start'
                }); // atrastraer el slide anterior, hacer un scroll suave (animacion)
            }
        } else if (direccion === 'adelante'){
            // obtener el ultimo slide visible
            const ultimoSlideVisible = slidesvisibles[slidesvisibles.length - 1];
            // conocer su index
            const indexUltimoSlideVisible = entradas.indexOf(ultimoSlideVisible);

            // si el index del ultimo slide visible es mayor a 0, entonces
            if(entradas.length - 1 > indexUltimoSlideVisible){
                // acceder al siguiente slide, y atrastraer para ponerlo en el primer pues/elemento/lugar
                entradas[indexUltimoSlideVisible + 1].target.scrollIntoView(
                    {
                        behavior: 'smooth',
                        inline: 'start'
                }); // atrastraer el slide siguiente, hacer un scroll suave (animacion)
            }
        }

        
        // despues dejar de observar el slide, para evitar alguna iteracion infinita
        const slides = galeria$2.querySelectorAll('.galeria__carousel-slide');
        slides.forEach((slide) => {
            // observar cada uno de los slides
            observer.unobserve(slide); // dejar de observar el slide
        });
    }, opciones);

    const slides = galeria$2.querySelectorAll('.galeria__carousel-slide');
        slides.forEach((slide) => {
            // observar cada uno de los slides
            observer.observe(slide); // observar el slide
        });
};

// acceder a la galeria
const galeria$1 = document.getElementById('galeria'); // seleccionar/acceder la seccion de galeria


const cerrarGaleria = () => {
    galeria$1.classList.remove('galeria--active'); // remover la clase para cerrar la galeria
    document.body.style.overflow = ''; // mostrar la barra de desplazamiento
    
};
 // exportar la funcion para poder usarla en otro archivo

const slideClick = (e) => {

    let ruta, nombre, descripcion;

    // acceder a la informacion del slide
    const id = parseInt(e.target.dataset.id); // acceder al id de la imagen

    // acceder a la galeria
    const galeria = document.getElementById('galeria'); // seleccionar/acceder la seccion de galeria
    const categoriaActiva = galeria.dataset.categoria; // acceder a la categoria activa

    // acceder a las fotos de la categoria activa, recoriendo el objeto

    datos.fotos[categoriaActiva].forEach((foto) => {
        // si el id de la foto es igual al id del slide, ejecuta el siguiente codigo
        if(foto.id === id){
            // reemplazar los valores
            ruta = foto.ruta;
            nombre = foto.nombre;
            descripcion = foto.descripcion;
        }
        cargarImagen(id, nombre, ruta, descripcion); // cargar la imagen
    });

};

// acceder a la galeria, para agregarle el evento
const galeria = document.getElementById('galeria'); // seleccionar/acceder la seccion de galeria

// agregar el evento
galeria.addEventListener('click', (e) => {
    const botton = e.target.closest('button'); // acceder al boton que se ha hecho click

    // buscar y comprobar si el boton tiene un atributo personalizado, "dataset" = accion -> CERRAR-GALERIA
    if(botton?.dataset?.accion === 'cerrar-galeria'){
        cerrarGaleria(); // ejecutar la funcion de cerrar galeria
    }

    // carrusel slide click -> detectar el click en el carrusel
    if(e.target.dataset.id){
        slideClick(e);
    }

    // MOVIEMIENTO DE LAS IMAGENES CON EL BOTON

    // BOTON DE SIGUIENTE IMAGEN
    // buscar el atributo "siguiente" en le dataset
    if(botton?.dataset?.accion == 'siguiente-imagen'){
        CargarAnteriorSiguienteImagen('siguiente');
    }
    
    
    
    // BOTON DE ANTERIOR IMAGEN
    // buscar el atributo "anterior" en le dataset
    if(botton?.dataset?.accion == 'anterior-imagen'){
        CargarAnteriorSiguienteImagen('anterior');
    }


    // MOVIMIENTOS DEL CARRUSEL CON BOTONES

    // CARRUSEL ADELANTE
    // buscar el atributo "siguiente-slide" en le dataset
    if(botton?.dataset?.accion == 'siguiente-slide'){
        carrusel('adelante');
    }
    
    
    
    // CARRUSEL ATRAS
    // buscar el atributo "anterior" en le dataset
    if(botton?.dataset?.accion == 'anterior-slide'){
        carrusel('atras');
    }
    
});
