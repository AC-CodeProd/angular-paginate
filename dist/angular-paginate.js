
!function(window,angular){"use strict";var ngPaginateModule=angular.module("ngPaginate",["ng"]);ngPaginateModule.directive("ngPaginate",function(){function calculatePageNumber(i,currentPage,paginateRange,totalPages){var halfWay=Math.ceil(paginateRange/2);return i===paginateRange?totalPages:1===i?i:totalPages>paginateRange?currentPage>totalPages-halfWay?totalPages-paginateRange+i:currentPage>halfWay?currentPage-halfWay+i:i:i}return{priority:0,restrict:"AE",scope:{items:"&",scrollTop:"@",scrollTarget:"@"},template:'<nav ng-if="1 < pages().length"><ul class="pagination"><li ng-class="{ disabled : isFirstPage() }"><a href="" ng-click="goPage(0)"><i class="fa fa-angle-double-left"></i></a></li><li ng-class="{ disabled : isFirstPage() }" ><a href="" title="Précédent" ng-disabled="isFirstPage()" ng-click="previousPage()"><i class="fa fa-angle-left"></i></a></li><li ng-repeat="page in pages()  track by $index" ng-class="{ active : paginate.currentPage == page, disabled : page == \'...\'}" ><a href="" title="{{paginate.page(page)}}" ng-click="goPage(page)">{{paginate.page(page)}}</a></li><li ng-class="{ disabled : isLastPage() }" ><a href="" title="Suivant" ng-disabled="isLastPage()" ng-click="nextPage()"><i class="fa fa-angle-right"></i></a></li><li ng-class="{ disabled : isLastPage() }"><a href="" ng-click="goPage(paginate.lastPage)"><i class="fa fa-angle-double-right"></i></a></li></ul><select ng-model="paginate.pageSize" ng-options="size for size in pageSizeList"></select></nav>',replace:!1,compile:function(){return{pre:function(scope){scope.pageSizeList=[5,10,20,50,100],scope.paginate={pageSize:100,currentPage:0,lastPage:0,page:function(page){return"..."!=page?page+1:page}},scope.isFirstPage=function(){return 0==scope.paginate.currentPage},scope.isCurrentPage=function(page){return scope.paginate.currentPage==page},scope.isLastPage=function(){return"..."!=scope.paginate.currentPage?scope.paginate.currentPage>=scope.paginate.lastPage:void 0},scope.previousPage=function(){scope.isFirstPage()||scope.paginate.currentPage--},scope.goPage=function(page){"..."!=page&&(scope.paginate.currentPage=page)},scope.nextPage=function(){scope.isLastPage()||scope.paginate.currentPage++},scope.firstPage=function(){scope.paginate.currentPage=0},scope.pages=function(){var position,pages=[],paginateRange=10,totalPages=Math.ceil(scope.items().length/scope.paginate.pageSize)-1,halfWay=Math.ceil(paginateRange/2);scope.paginate.lastPage=totalPages,position=scope.paginate.currentPage<=halfWay?"start":totalPages-halfWay<scope.paginate.currentPage?"end":"middle";for(var ellipsesNeeded=totalPages>paginateRange,i=0;totalPages>=i&&paginateRange>=i;){var pageNumber=calculatePageNumber(i,scope.paginate.currentPage,paginateRange,totalPages),openingEllipsesNeeded=1===i&&("middle"===position||"end"===position),closingEllipsesNeeded=i===paginateRange-1&&("middle"===position||"start"===position);pages.push(ellipsesNeeded&&(openingEllipsesNeeded||closingEllipsesNeeded)?"...":pageNumber),i++}return pages},scope.$watch("paginate.pageSize",function(newValue,oldValue){newValue!=oldValue&&scope.firstPage()}),scope.$parent.firstPage=function(){scope.firstPage()},scope.$parent.pageItems=function(){scope.scrollTop&&document.getElementById(scope.scrollTarget).scrollIntoView(!0);var start=scope.paginate.currentPage*scope.paginate.pageSize,limit=scope.paginate.pageSize;return scope.items().slice(start,start+limit)}},post:function(){}}}}})}(window,window.angular);