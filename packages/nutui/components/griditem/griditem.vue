<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent } from 'vue'
import { CLICK_EVENT, PREFIX } from '../_constants'
import { useInject, useRouter } from '../_hooks'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import type { GridProps } from '../grid'
import { GRID_KEY } from '../grid'
import { gridItemEmits, gridItemProps } from './griditem'

const props = defineProps(gridItemProps)
const emit = defineEmits(gridItemEmits)
const componentName = `${PREFIX}-grid-item`

const Parent = useInject<{ props: Required<GridProps> }>(GRID_KEY)
const index = Parent.index
const parent = Parent?.parent?.props
// root
const classes = computed(() => {
  return getMainClass(props, componentName)
})

const styles = computed(() => {
  if (!parent)
    return
  const style: CSSProperties = {
    flexBasis: `${100 / +parent.columnNum}%`,
  }

  if (parent?.square) {
    style.paddingTop = `${100 / +parent.columnNum}%`
  }
  else if (parent.gutter) {
    style.paddingRight = pxCheck(parent.gutter)
    if (index.value >= Number(parent.columnNum))
      style.marginTop = pxCheck(parent.gutter)
  }

  return getMainStyle(props, style)
})

// content
const contentClass = computed(() => {
  if (!parent)
    return
  const prefixCls = `${componentName}__content`
  return {
    [`${prefixCls}`]: true,
    [`${prefixCls}--border`]: parent.border,
    [`${prefixCls}--surround`]: parent.border && parent.gutter,
    [`${prefixCls}--center`]: parent.center,
    [`${prefixCls}--square`]: parent.square,
    [`${prefixCls}--reverse`]: parent.reverse,
    [`${prefixCls}--${parent.direction}`]: !!parent.direction,
    [`${prefixCls}--clickable`]: parent.clickable,
  }
})

// click
const router = useRouter()
function handleClick(event: unknown) {
  emit(CLICK_EVENT, event as MouseEvent)

  if (props.to && router) {
    router[props.replace ? 'replace' : 'push'](props.to as string)
    // #ifdef H5
  }
  else if (props.url) {
    if (props.replace)
      window.location.replace(props.url)

    else
      window.location.href = props.url

    // #endif
  }
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'NutGridItem',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="classes" :style="styles" @click="handleClick">
    <view :class="contentClass">
      <slot />
      <view class="nut-grid-item__text">
        <template v-if="text">
          {{ text }}
        </template>
        <slot v-else name="text" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
