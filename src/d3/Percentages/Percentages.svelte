<script lang="ts">
	export let coins: number;
	export let cash: number;
	export let banknotes: number;
	export let totalCount: number;
</script>

<style>
	section {
		display: flex;
		width: 700px;
		justify-content: space-between;
	}

	.container {
		display: flex;
		flex-direction: column;
		position: relative;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background-color: #666;
		color: #fff;
	}

	span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		font-weight: 500;
		font-size: 1.4rem;
	}
</style>

<section>
	<div class="container">
		<div><span>Cash {(cash / totalCount) * 100}%</span></div>
	</div>
	<div class="container"><span>Coins {(coins / totalCount) * 100}%</span></div>
	<div class="container"><span>Banknotes {(banknotes / totalCount) * 100}%</span></div>
</section>
