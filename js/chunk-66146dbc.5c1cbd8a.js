(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66146dbc"],{"129f":function(t,a){t.exports=Object.is||function(t,a){return t===a?0!==t||1/t===1/a:t!=t&&a!=a}},1799:function(t,a,i){"use strict";var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return t.paginationInfo?i("nav",{staticClass:"mt-3 d-flex justify-content-center",attrs:{"aria-label":"Page navigation example"}},[i("ul",{staticClass:"pagination"},[i("li",{staticClass:"page-item",class:{disabled:!t.paginationInfo.has_pre}},[i("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(a){return a.preventDefault(),t.getProducts(t.paginationInfo.current_page-1)}}},[i("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.paginationInfo.total_pages,(function(a){return i("li",{key:a,staticClass:"page-item",class:{active:t.paginationInfo.current_page===a}},[i("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.getProducts(a)}}},[t._v(t._s(a))])])})),i("li",{staticClass:"page-item",class:{disabled:!t.paginationInfo.has_next}},[i("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(a){return a.preventDefault(),t.getProducts(t.paginationInfo.current_page+1)}}},[i("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)]):t._e()},r=[],s={name:"pagination",props:["paginationInfo"],data:function(){return{}},methods:{getProducts:function(t){this.$emit("changePage",t)}}},n=s,o=i("2877"),c=Object(o["a"])(n,e,r,!1,null,null,null);a["a"]=c.exports},"7db0":function(t,a,i){"use strict";var e=i("23e7"),r=i("b727").find,s=i("44d2"),n="find",o=!0;n in[]&&Array(1)[n]((function(){o=!1})),e({target:"Array",proto:!0,forced:o},{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),s(n)},"841c":function(t,a,i){"use strict";var e=i("d784"),r=i("825a"),s=i("1d80"),n=i("129f"),o=i("14c3");e("search",1,(function(t,a,i){return[function(a){var i=s(this),e=void 0==a?void 0:a[t];return void 0!==e?e.call(a,i):new RegExp(a)[t](String(i))},function(t){var e=i(a,t,this);if(e.done)return e.value;var s=r(t),c=String(this),u=s.lastIndex;n(u,0)||(s.lastIndex=0);var l=o(s,c);return n(s.lastIndex,u)||(s.lastIndex=u),null===l?-1:l.index}]}))},"99af":function(t,a,i){"use strict";var e=i("23e7"),r=i("d039"),s=i("e8b5"),n=i("861d"),o=i("7b0b"),c=i("50c4"),u=i("8418"),l=i("65f0"),d=i("1dde"),f=i("b622"),p=i("2d00"),g=f("isConcatSpreadable"),v=9007199254740991,h="Maximum allowed index exceeded",C=p>=51||!r((function(){var t=[];return t[g]=!1,t.concat()[0]!==t})),b=d("concat"),y=function(t){if(!n(t))return!1;var a=t[g];return void 0!==a?!!a:s(t)},m=!C||!b;e({target:"Array",proto:!0,forced:m},{concat:function(t){var a,i,e,r,s,n=o(this),d=l(n,0),f=0;for(a=-1,e=arguments.length;a<e;a++)if(s=-1===a?n:arguments[a],y(s)){if(r=c(s.length),f+r>v)throw TypeError(h);for(i=0;i<r;i++,f++)i in s&&u(d,f,s[i])}else{if(f>=v)throw TypeError(h);u(d,f++,s)}return d.length=f,d}})},c740:function(t,a,i){"use strict";var e=i("23e7"),r=i("b727").findIndex,s=i("44d2"),n="findIndex",o=!0;n in[]&&Array(1)[n]((function(){o=!1})),e({target:"Array",proto:!0,forced:o},{findIndex:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),s(n)},fe25:function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"container mt-4"},[i("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),0!==t.products.length||t.isLoading?t._e():i("div",{staticClass:"text-center"},[i("h3",{staticClass:"py-4"},[t._v("目前尚無產品哦")])]),i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-3"},[i("div",{staticClass:"sticky-navbar"},[i("div",{staticClass:"input-group mb-3"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"form-control",attrs:{type:"text",placeholder:"搜尋商品"},domProps:{value:t.search},on:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.findProducts(a)},input:function(a){a.target.composing||(t.search=a.target.value)}}}),i("div",{staticClass:"input-group-append"},[i("button",{staticClass:"btn btn-outline-primary",attrs:{type:"button"},on:{click:t.findProducts}},[i("i",{staticClass:"fas fa-search"})])])]),i("ul",{staticClass:"category"},[i("li",{staticClass:"category-group"},[i("button",{staticClass:"category-group-item",attrs:{type:"button"},on:{click:function(a){return t.categoryProducts()}}},[t._v(" 全部商品 ")])]),i("li",{staticClass:"category-group"},[i("button",{staticClass:"category-group-item",attrs:{type:"button"},on:{click:function(a){return t.categoryProducts("主食類")}}},[t._v(" 主食類 ")])]),i("li",{staticClass:"category-group"},[i("button",{staticClass:"category-group-item",attrs:{type:"button"},on:{click:function(a){return t.categoryProducts("增肌類")}}},[t._v(" 增肌類 ")])]),i("li",{staticClass:"category-group"},[i("button",{staticClass:"category-group-item",attrs:{type:"button"},on:{click:function(a){return t.categoryProducts("沙拉類")}}},[t._v(" 沙拉類 ")])]),i("li",{staticClass:"category-group"},[i("button",{staticClass:"category-group-item",attrs:{type:"button"},on:{click:function(a){return t.categoryProducts("飲料")}}},[t._v(" 飲品 ")])]),i("li",{staticClass:"category-group"},[i("button",{staticClass:"category-group-item",attrs:{type:"button"},on:{click:function(a){return t.categoryProducts("即將上市")}}},[t._v(" 即將上市 ")])])])])]),i("div",{staticClass:"col-md-9"},[i("div",{staticClass:"row"},t._l(t.filterProducts,(function(a){return i("div",{key:a.id,staticClass:"col-lg-4 col-md-6 col-sm-6 mb-4",class:{"not-allowed":"即將上市"===a.category}},[i("div",{staticClass:"card border-0 h-100 position-relative text-decoration-none",class:{product:"即將上市"!==a.category,disabled:"即將上市"===a.category},on:{click:function(i){"即將上市"!==a.category&&t.getSpecifiedProduct(a.id)}}},[i("div",{staticClass:"rounded-top bg-cover",staticStyle:{height:"150px"},style:{backgroundImage:"url("+a.imageUrl+")"}}),i("div",{staticClass:"card-body"},[i("div",{staticClass:"d-flex justify-content-between"},[i("span",{staticClass:"badge badge-highlight text-white"},[t._v(t._s(a.category)+" ")]),i("div",[t.isFavorite(a.id)?t._e():i("a",{staticClass:"like-icon empty",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),i.stopPropagation(),t.addFavorite(a)}}},[i("i",{staticClass:"far fa-heart fa-lg"})]),t.isFavorite(a.id)?i("a",{staticClass:"like-icon full",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),i.stopPropagation(),t.removeFavorite(a)}}},[i("i",{staticClass:"fas fa-heart fa-lg"})]):t._e()])]),i("h5",{staticClass:"card-title font-weight-bold text-ellipsis"},[i("a",{attrs:{href:"#"}},[t._v(t._s(a.title))])]),i("p",{staticClass:"card-text text-dark text-ellipsis"},[t._v(" "+t._s(a.content)+" ")]),i("div",{staticClass:"d-flex justify-content-between align-items-center"},[i("div",{staticClass:"price"},[a.origin_price?i("div",[i("del",{staticClass:"h6"},[t._v("NT"+t._s(t._f("currency")(a.origin_price))+" 元")]),i("div",{staticClass:"h5 text-highlight"},[t._v(" NT"+t._s(t._f("currency")(a.price))+" 元 ")])]):i("div",{staticClass:"h5 text-highlight"},[t._v(" NT"+t._s(t._f("currency")(a.price))+" 元 ")])]),i("button",{staticClass:"btn btn-cart btn-outline-primary d-flex justify-content-center align-items-center",attrs:{type:"button",disabled:"即將上市"===a.category},on:{click:function(i){return i.stopPropagation(),t.addtoCart(a)}}},[t.status.addtoCart!==a.id?i("i",{staticClass:"fas fa-cart-plus fa-lg"}):t._e(),t.status.addtoCart===a.id?i("i",{staticClass:"fas fa-spinner fa-spin"}):t._e()])])]),i("button",{staticClass:"btn btn-block btn-outline-highlight",attrs:{type:"button",disabled:"即將上市"===a.category},on:{click:function(i){return t.getSpecifiedProduct(a.id)}}},[t.status.loadingItem===a.id?i("i",{staticClass:"fas fa-spinner fa-spin"}):t._e(),t._v(" 查看更多 ")])])])})),0),0===t.filterProducts.length&&""!=t.search?i("div",{staticClass:"text-center"},[i("h3",{staticClass:"py-4"},[t._v("目前無此商品哦")])]):t._e(),t.filterProducts.length>0?i("Pagination",{attrs:{id:"Pagination","pagination-info":t.pagination},on:{changePage:t.getProducts}}):t._e()],1)])],1)},r=[],s=(i("99af"),i("c740"),i("a9e3"),i("7db0"),i("4de4"),i("841c"),i("ac1f"),i("1157")),n=i.n(s),o=i("1799"),c={data:function(){return{isLoading:!1,allProducts:[],products:[],filterProducts:[],pagination:{},status:{loadingItem:"",addtoCart:""},carts:JSON.parse(localStorage.getItem("tempCarts"))||{carts:[],total:0,finalTotal:0},favoritePds:JSON.parse(localStorage.getItem("favorite"))||[],search:""}},methods:{getProducts:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=this,i="".concat("https://vue-course-api.hexschool.io","/api/").concat("neil0907","/products?page=").concat(t);a.isLoading=!0,a.$http.get(i).then((function(t){a.products=t.data.products,a.filterProducts=a.products,a.pagination=t.data.pagination})),i="".concat("https://vue-course-api.hexschool.io","/api/").concat("neil0907","/products/all"),a.$http.get(i).then((function(t){a.allProducts=t.data.products,a.isLoading=!1}))},getSpecifiedProduct:function(t){this.$router.push("/product/".concat(t)).catch((function(){}))},addtoCart:function(t){var a=this;a.isLoading=!1,a.status.addtoCart=t.id;var i=a.carts.carts.findIndex((function(a){return a.id===t.id}));if(-1===i){var e={id:t.id,qty:1,title:t.title,imageUrl:t.imageUrl,unit:t.unit,origin_price:""===t.origin_price?Number(t.price):t.origin_price,price:Number(t.price)};a.carts.carts.push(e)}else a.carts.carts[i].qty++,a.carts.carts[i].total+=Number(t.price);a.carts.total+=Number(t.price),a.carts.finalTotal+="coupon"in a.carts?Math.floor(Number(t.price)*a.carts.coupon.percent):Number(t.price),localStorage.setItem("tempCarts",JSON.stringify(a.carts));var r=a.filterProducts.find((function(a){return a.id===t.id})).title;a.$bus.$emit("message:push","已將 ".concat(r," 加入購物車"),"success"),a.$bus.$emit("updateCarts"),a.isLoading=!1,a.status.addtoCart=""},removeCart:function(t){var a=this,i="".concat("https://vue-course-api.hexschool.io","/api/").concat("neil0907","/cart/").concat(t);a.isLoading=!0,a.$http.delete(i).then((function(){a.isLoading=!1,a.getCarts()}))},addFavorite:function(t){var a=this;a.favoritePds.push(t),localStorage.setItem("favorite",JSON.stringify(a.favoritePds)),a.$bus.$emit("message:push","已加入收藏","success")},removeFavorite:function(t){var a=this;a.favoritePds=a.favoritePds.filter((function(a){return a.id!==t.id})),localStorage.setItem("favorite",JSON.stringify(a.favoritePds)),a.$bus.$emit("message:push","已取消收藏","success")},isFavorite:function(t){var a=this;return a.favoritePds.some((function(a){return a.id===t}))},findProducts:function(){var t=this;""===t.search?t.filterProducts=t.products:t.filterProducts=t.products.filter((function(a){return-1!==a.title.indexOf(t.search)}))},categoryProducts:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all",a=this;"all"===t?(a.filterProducts=a.products,n()(".pagination").show()):(a.filterProducts=a.allProducts.filter((function(a){return a.category===t})),n()(".pagination").hide())}},created:function(){var t=this;t.getProducts(),t.$bus.$on("updateCarts",(function(){t.carts=JSON.parse(localStorage.getItem("tempCarts"))||{carts:[],total:0,finalTotal:0}}))},components:{Pagination:o["a"]}},u=c,l=i("2877"),d=Object(l["a"])(u,e,r,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-66146dbc.5c1cbd8a.js.map