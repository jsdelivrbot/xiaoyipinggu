<template>
   <div class="section_header">
       <ol class="breadcrumb">
         <slot></slot>
         <slot name="name"></slot>
      </ol>
   </div>
</template>
<style>
.section_header{
    background: #F5F5F5;
    padding: 12px 2%;
    border-bottom: 1px solid #BBBBBB;
}
.section_header ol {
    margin: 0;
    padding: 0;
}
.section_header .breadcrumb>li {
    color: #428bca;
}
.section_header .breadcrumb>.active {
    color: #000;
}
</style>

