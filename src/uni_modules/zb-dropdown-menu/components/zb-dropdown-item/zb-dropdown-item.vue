
<template>
  <view class="zb-dropdown-item zb-dropdown-item--down"  :style="[parent.style,{
    zIndex:zIndex
  }]"
        v-show="showWrap">
    <view class="zb-overlay"
          @touchmove.stop.prevent="()=>{}"
          :class="[{
					'mask__visible':mask
				}]" @click.stop="close">
    </view>
    <view class="zb-popup zb-popup--top zb-dropdown-item__content zb-popup-slide-top-leave-active"
          :class="[{
					'content--visible_Y':mask
				}]">
      <view style="min-height: 50px;">
        <view
            class="zb-cell zb-cell--clickable zb-dropdown-item__option"
            v-for="item,index in options"
            :key="index"
            @click.stop="clickCell(item)"
        >
          <view class="zb-cell__title"
                :class="[{
                  'active-cell__title':mValue===item.value
                }]"
                :style="[{
                  color:mValue===item.value?activeColor:''
                }]"
          >
            <text>{{item.text}}</text>
          </view>
          <view class="zb-cell__value" v-if="mValue===item.value">
            <text
                class="iconfont icon-duihao active-icon"
                :style="[{
                  color:showWrap?activeColor:''
                }]"
            ></text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name:'zb-dropdown-item',
  options: {
    virtualHost: true
  },
  props:{
    value:{
		 type:[String,Number],
	  },
    modelValue:{
      type:[String,Number],
    },
    name:{
      type:[String,Number],
      required:true
    },
    options: {
      type:Array,
      default:()=>[]
    }
  },

  inject: {
    parent: {
      default: null,
    },
  },
  data(){
    return{
      zIndex:null,
      activeColor:null,
      mask: false,
      showWrap: false,
      title:null,
    }
  },
  watch:{
    // #ifndef VUE3
    value:{
      handler(newValue, oldValue) {
        const item = this.options.find(
            (option) => option.value === this.mValue
        );
        this.title = item.text||''
        this.$emit('change', {...item});
      },
    },
	// #endif

	// #ifdef VUE3
	modelValue:{
	  handler(newValue, oldValue) {
	    const item = this.options.find(
	        (option) => option.value === this.mValue
	    );
	    this.title = item.text||''
	    this.$emit('change', {...item});
	  },
	},
	// #endif
    showWrap:{
      handler (newLength, oldLength) {
        // console.log('newLength=====',newLength)
      },
      immediate: true
    },
    options:{
      handler(newValue, oldLength) {
        if(newValue.length){
          const match = this.options.filter(
              (option) => option.value === this.mValue
          );
          let title = match.length ? match[0].text :'';

          this.title = title
        }else {
        }

      },
      immediate: true,
      deep:true
    }
  },
  computed: {
    mValue(){
      return this.value!=null?this.value:this.modelValue
    },
    displayTitle:{
      get(){
        if (this.title) {
          return this.title;
        }
        const match = this.options.filter(
            (option) => option.value === this.mValue
        );
        let title = match.length ? match[0].text :'';
        this.title = title
        return title
      },
      set(val){
        this.title = val
      }
    },
  },
  methods:{
    /**
     * 获取父元素实例
     */
    getDropdown(name = 'zb-dropdown-menu') {
      let parent = this.$parent
      let parentName = parent.$options.name
      while (parentName !== name) {
        parent = parent.$parent
        if (!parent) return false
        parentName = parent.$options.name
      }
      return parent
    },
    clickCell(item){
      this.changeStatus(this,'mask','showWrap',false)
      if (item.value !== this.mValue) {
        this.title = item.text
        this.$emit('update:modelValue', item.value);
        this.$emit('input', item.value);
      }
    },
    changeStatus(item, param1, param2, status) {
      item[param1] = status
      this.watchTimer && clearTimeout(this.watchTimer)
      this.watchTimer = setTimeout(() => {
        item[param2] = status
      }, status ? 20 : 200)
    },
    close(item,type){
      let index = this.parent.childrenList.findIndex(item=>item.title===this.title)
      this.parent.closeMask({},index)

    },
    moveHandle(){
      return false
    },
    bindRelation() {
      let obj = this.parent.childrenList.find(item=>{
        let flag = item.name === this.name
        return flag
      })
      if (!this.parent || obj) {
        return;
      }
      // #ifndef H5
      let obj1 = Object.assign(
          this.$data,
          this.$props
      )
      // #endif
      // #ifdef H5
      let obj1 = this
      // #endif
      const children = [...this.parent.childrenList, obj1];
      this.parent.childrenList = children;

    },
  },
  created(){
    this.bindRelation()
    let parentDropMenu = this.getDropdown()
    this.activeColor= parentDropMenu.activeColor
    this.zIndex= parentDropMenu.zIndex
  },
  beforeDestroy() {
    if (this.parent) {
      this.parent.childrenList = this.parent.childrenList.filter(
          (item) => item.title !== this.title
      );
    }
  },

}
</script>

<style lang="scss" scoped>
.zb-dropdown-item {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 10;
  overflow: hidden;
}
.zb-dropdown-menu {
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
}


.zb-popup {
  &-slide-top-leave-active,
  &-slide-left-leave-active,
  &-slide-right-leave-active,
  &-slide-bottom-leave-active {
    transition-timing-function: ease-in;
  }
}


.zb-popup-slide-top-enter,
.zb-popup-slide-top-leave-active {
  transform: translate3d(0, -100%, 0);
}

.zb-popup-slide-right-enter,
.zb-popup-slide-right-leave-active {
  transform: translate3d(100%, -50%, 0);
}

.zb-popup-slide-bottom-enter,
.zb-popup-slide-bottom-leave-active {
  transform: translate3d(0, 100%, 0);
}

.zb-dropdown-menu__bar {
  position: relative;
  display: flex;
  height: 48px;
  background-color: #fff;
  box-shadow: 0 2px 12px #6465661f;
}

.zb-dropdown-menu__item {
  display: flex;
  flex: 1;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  min-width: 0;
  //cursor: pointer;
}

.zb-dropdown-menu__title {
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0 8px;
  color: #323233;
  font-size: 15px;
  line-height: 22px;
}

.zb-dropdown-menu__title::after {
  position: absolute;
  top: 50%;
  right: -4px;
  margin-top: -5px;
  border: 3px solid;
  border-color: transparent transparent #dcdee0 #dcdee0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  opacity: 0.8;
  content: '';
}

.zb-dropdown-menu__title--down::after {
  margin-top: -1px;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}
.zb-dropdown-menu__title--active::after {
  border-color: transparent transparent currentColor currentColor;
}
.zb-dropdown-menu__bar--opened {
  z-index: 11;
}
.zb-dropdown-menu__title--active {
  color: #ee0a24;
}
.zb-dropdown-item--down {
  bottom: 0;
}
.zb-overlay {
  z-index: 2003;
  position: absolute;
  animation-duration: 0.2s;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.3s;
}
.mask__visible {
  opacity: 1;
}

.zb-popup {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  background-color: #fff;
  -webkit-transition: -webkit-transform 0.2s;
  transition: -webkit-transform 0.2s;
  transition: transform 0.2s;
  transition: transform 0.2s, -webkit-transform 0.2s;
  -webkit-overflow-scrolling: touch;
}

.zb-dropdown-item__content {
  position: absolute;
  max-height: 80%;
  transition-duration: 0.2s;
  z-index: 2006;
}

.zb-popup--top {
  top: 0;
  left: 0;
  width: 100%;
}

.content--visible_Y {
  transform: translateY(0px);
}


@keyframes zb-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes zb-fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.zb-fade {
  &-enter-active {
    animation: 0.2s zb-fade-in both ease-out;
  }

  &-leave-active {
    animation: 0.2s zb-fade-out both ease-in;
  }
}


.zb-cell{
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  align-items: center;
  line-height: 24px;
  background-color: #fff;
}
.zb-cell::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.zb-cell--clickable{
  //cursor: pointer;
}


@font-face {
  font-family: "iconfont"; /* Project id 3711565 */
  src:
      url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAJ0AAsAAAAABiwAAAIqAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACCcAooRgE2AiQDCAsGAAQgBYRnBzAbggXIrrApw71IoCYMFA7zwg8FpwSIh//2a/fNnxXFNKlm0SyaaJYoYSsJQqJ0UrcOmUPc/Z+2G0vd+VMRqtMdYw3bmbT7/5emDL2VRVgUDiFxWIyiVpkbW96eX2X9dryc+m6f/lTOAgrwA7GsfRdK96BF0/qBWi9QALuHtVTCXs+LXIXhVQe5E88I1G1Y1TvePb7uTJ8CqTtzA/Z4kDXHU5YEnYmUlmVaqwpldG8Wr0qk5xQv0efj11ZMSEoFu+3scSfufJ2zoOh0OxQfOvP10McSSiiwoiMTV93lE33RxPfVg4Ep2pkFP7rdwBe79oT419mNTTBJK8EPb6kACW6LNtwY9SBRvqOrm+TinWt8/sfn7NN08ZbovwqOnx96s+2/aiOD7zxyMyxKdbUg+AfGLUjMRoaUmwRpNCnvVq07ObrseL/fsfbAueqhamBEtGIiQ6FqisrcEkoatlBWtYO6ZTuHGwZofZFrmPNEEHp9IGl7R6HXN5W5H5QM+0NZr3/U3UTrvIa5iLYYA8EYwkfIIlWTa0kU9hKTtgy4rnCL3GQ0B7ZhlWt7WCNPsaG5SxwRAmJVwa7wGJalAs0qx0iMVEQvTJOa3mJEqupsYSggUAyEHoFMRKlRQJbi911CiVYpwCB1W2aNjIYHNoMFUHt6DQ3cySuNOwmHEAQQplTArjQLlUoK0M2zcigiDOmIorZgOiRCdWN9s/q0E1BnOymcaYXyfZulgep0AA==') format('woff2')
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-duihao:before {
  content: "\eaf1";
}
.zb-cell__title, .zb-cell__value{
  flex: 1;
}

.zb-cell__value{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.active-icon,.active-cell__title{
  color: #ee0a24;
}

</style>
