import { rest } from 'msw';

export const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon/1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        forms: [
          {
            name: 'bulbasaur',
          },
        ],
      })
    );
  }),

  rest.get('https://pokeapi.co/api/v2/pokemon/2', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        forms: [
          {
            name: 'pikachu',
          },
        ],
      })
    );
  }),

  rest.get('https://pokeapi.co/api/v2/pokemon/ll', (req, res, ctx) => {
    return res(ctx.status(404));
  }),
];
