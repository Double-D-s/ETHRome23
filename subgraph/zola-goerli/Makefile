regenerate: 
	pnpm run codegen
	graph build --network localhost
	pnpm run remove-local
	pnpm run create-local
	pnpm run deploy-local

sub:
	pnpm run remove-local
	pnpm run create-local
	pnpm run deploy-local

# To launch these commands, you need first to auth with the graph-cli and the subgraph
## Görli hosted subgraph: https://thegraph.com/hosted-service/subgraph/creedscode/zola-goerli
deploy-goerli: 
	graph codegen
	graph build --network goerli
	graph deploy --product hosted-service creedscode/zola-goerli