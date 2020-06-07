// my-behavior.js
export default Behavior({
  data: {
    simba:'simba'
  },
  methods:{
    $emit(ename , evalue){
      console.log("触发了" , ename , "值为" , evalue)
      this.triggerEvent(ename , evalue)
    },
    $getData(key){
      return this.data[key]
    }
  }
})