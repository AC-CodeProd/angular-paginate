(function(window, angular, undefined) {
    'use strict';
    var ngPaginateModule = angular.module('ngPaginate', ['ng']);
    ngPaginateModule.directive('ngPaginate', function() {
        function calculatePageNumber(i, currentPage, paginateRange, totalPages) {
            var halfWay = Math.ceil(paginateRange / 2);
            if (i === paginateRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginateRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginateRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }
        return {
            priority: 0,
            restrict: 'AE',
            scope: {
                items: '&',
                scrollTop: "@",
                scrollTarget: "@"
            },
            template: '<nav ng-if="1 < pages().length">' + '<ul class="pagination">' + '<li ng-class="{ disabled : isFirstPage() }"><a href="" ng-click="goPage(0)"><i class="fa fa-angle-double-left"></i></a></li>' + '<li ng-class="{ disabled : isFirstPage() }" ><a href="" title="Précédent" ng-disabled="isFirstPage()" ng-click="previousPage()"><i class="fa fa-angle-left"></i></a></li>' + '<li ng-repeat="page in pages()  track by $index" ng-class="{ active : paginate.currentPage == page, disabled : page == \'...\'}" ><a href="" title="{{paginate.page(page)}}" ng-click="goPage(page)">{{paginate.page(page)}}</a></li>' + '<li ng-class="{ disabled : isLastPage() }" ><a href="" title="Suivant" ng-disabled="isLastPage()" ng-click="nextPage()"><i class="fa fa-angle-right"></i></a></li>' + '<li ng-class="{ disabled : isLastPage() }"><a href="" ng-click="goPage(paginate.lastPage)"><i class="fa fa-angle-double-right"></i></a></li>' + '</ul>' + '<select ng-model="paginate.pageSize" ng-options="size for size in pageSizeList"></select>' + '</nav>',
            replace: false,
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                        scope.pageSizeList = [5, 10, 20, 50, 100];
                        scope.paginate = {
                            pageSize: 100,
                            currentPage: 0,
                            lastPage: 0,
                            page: function(page) {
                                if (page != '...')
                                    return page + 1;
                                else
                                    return page;
                            }
                        };

                        scope.isFirstPage = function() {
                            return scope.paginate.currentPage == 0;
                        };
                        scope.isCurrentPage = function(page) {
                            return scope.paginate.currentPage == page;
                        }
                        scope.isLastPage = function() {
                            if (scope.paginate.currentPage != '...') {
                                return scope.paginate.currentPage >= scope.paginate.lastPage;
                            }
                        };
                        scope.previousPage = function() {
                            if (!scope.isFirstPage()) {
                                scope.paginate.currentPage--;
                            }
                        };
                        scope.goPage = function(page) {
                            if (page != '...') {
                                scope.paginate.currentPage = page;
                            }
                        }
                        scope.nextPage = function() {
                            if (!scope.isLastPage()) {
                                scope.paginate.currentPage++;
                            }
                        };
                        scope.firstPage = function() {
                            scope.paginate.currentPage = 0;
                        };
                        scope.pages = function() {
                            var pages = [];
                            var paginateRange = 10;
                            var totalPages = Math.ceil(scope.items().length / scope.paginate.pageSize) - 1;
                            var halfWay = Math.ceil(paginateRange / 2);
                            var position;
                            scope.paginate.lastPage = totalPages;

                            if (scope.paginate.currentPage <= halfWay) {
                                position = 'start';
                            } else if (totalPages - halfWay < scope.paginate.currentPage) {
                                position = 'end';
                            } else {
                                position = 'middle';
                            }

                            var ellipsesNeeded = paginateRange < totalPages;
                            var i = 0;
                            while (i <= totalPages && i <= paginateRange) {
                                var pageNumber = calculatePageNumber(i, scope.paginate.currentPage, paginateRange, totalPages);

                                var openingEllipsesNeeded = (i === 1 && (position === 'middle' || position === 'end'));
                                var closingEllipsesNeeded = (i === paginateRange - 1 && (position === 'middle' || position === 'start'));
                                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                                    pages.push('...');
                                } else {
                                    pages.push(pageNumber);
                                }
                                i++;
                            }
                            return pages;
                        };
                        scope.$watch('paginate.pageSize', function(newValue, oldValue) {
                            if (newValue != oldValue) {
                                scope.firstPage();
                            }
                        });

                        scope.$parent.firstPage = function() {
                            scope.firstPage();
                        };

                        scope.$parent.pageItems = function() {
                            if (scope.scrollTop) {
                                document.getElementById(scope.scrollTarget).scrollIntoView(true);
                            }
                            var start = scope.paginate.currentPage * scope.paginate.pageSize;
                            var limit = scope.paginate.pageSize;
                            return scope.items().slice(start, start + limit);
                        };
                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {}
                };
            }
        };
    });
})(window, window.angular);