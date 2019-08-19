<template>
  <div>{{msg}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ZAppComponent extends Vue {
  @Prop({ default: 'You have successfully created a vue application.' })
  public msg: string;
}
</script>

<style>
</style>
