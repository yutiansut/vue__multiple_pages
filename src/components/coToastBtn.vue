<template>
	<a @click="clickBtn">
		<slot></slot>
	</a>
</template>

<script>
	export default {
		name: 'toast-btn',
		props: {
			addr: {
				type: String,
				default: ''
			}
		},
		methods: {
			clickBtn() {
					var _this=this;
					if(_this.addr == '#') {
						_this.$toast({
			             	message: '该功能尚未开通!',
			              	position: 'center',
		            	});
					}else {
						window.location.href = _this.addr;
					}
					_this.$emit('clicks');
			}
		}
	}
</script>