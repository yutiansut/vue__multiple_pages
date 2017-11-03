<template>
    <div class="pb-multi-slide">
        <transition :name="`slides-${slideTransition}`">
            <div
            v-show="currentValue"
            :class="`slides${slideTransition}`">
                <slot></slot>
            </div>
        </transition>

        <transition :name="maskTransition">
            <div
            class="mask"
            v-show="currentValue"
            @click="clickable && (currentValue = false)">
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'multi-slide',
        props: {
            value: {},
            disabled: Boolean,
            slideTransition: { //滑出方向
                type: String,
                default: 'up'
            },
            maskTransition: {
                type: String,
                default: 'fade'
            },
            clickable: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                currentValue: this.value
            }
        },
        watch: {
            value(val) {
                this.currentValue = val;
            },
            currentValue(val) {
                if(this.disabled){
                    val ? this.$emit('show') : this.$emit('close');
                }else if (this.isArray(val) && val.length === 0){
                    this.currentValue = undefined;
                    val ? this.$emit('show') : this.$emit('close');
                }else {
                    this.$emit('input', val);
                    this.$emit('change', val, this.currentText);
                    val ? this.$emit('show') : this.$emit('close');
                }
            },
        },
        methods: {
            isArray(array) {
               return Object.prototype.toString.call(array) === '[object Array]';
            }
        }
    };
</script>
