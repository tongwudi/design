<template>
  <div class="setting-title">
    <div class="setting-title-text">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.setting-title {
  height: 30px;
  background-color: #F5F7FA;

  &-text {
    position: relative;
    padding-left: 12px;
    line-height: 30px;
    height: 30px;

    &:after {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      width: 4px;
      height: 14px;
      background-color: #409EFF;
    }
  }
}
</style>
