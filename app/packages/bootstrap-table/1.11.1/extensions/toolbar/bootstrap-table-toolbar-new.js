/**
 * @author: aperez <aperez@datadec.es>
 * @version: v2.0.0
 *
 * @update Dennis HernÃ¡ndez <http://djhvscf.github.io/Blog>
 */
/* eslint consistent-this: "off", vars-on-top: "off", no-undefined: "off", prefer-template: "off", no-useless-concat: "off", guard-for-in: "off" */

!function ($) {
  // 'use strict'

  var firstLoad = false

  var sprintf = $.fn.bootstrapTable.utils.sprintf


  var showAvdSearch = function (pColumns, searchTitle, searchText, that) {
    if (!$('#avdSearchModal' + '_' + that.options.idTable).hasClass('flexi-item')) {
      // var vModal = sprintf('<div id="avdSearchModal%s" class="modal bss flexi-container align-items-center fade mx-auto" data-backdrop="false" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" style="display: block;">', '_' + that.options.idTable, searchTitle)  
      var vModal = sprintf('<div id="avdSearchModal%s" class="theFormModal flexi-item align-items-stretch" data-backdrop="false" style="display: block;">', '_' + that.options.idTable, searchTitle)
      vModal += '<div id="advSearch" class="search-form card-theme-blue m-auto">'
      vModal += ' <div id="sForm" class="card">'
      vModal += '  <div class="row p-0 card-header"><div class="col-8 p-0">'
      vModal += sprintf('<h4 id="searchTitle" class="sTitle">%s</h4></div><div class="col-4 text-right">', searchTitle)
      // vModal += '   <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
      vModal += '  </div></div>'
      vModal += sprintf('   <div class=" p-0" id="avdSearchModalContent%s">', '_' + that.options.idTable)
      vModal += '  </div>'
      // vModal += sprintf('<div class="modal-footer text-right"><button type="button" id="btnCloseAvd%s" class="btn btn-red" >%s</button></div>', '_' + that.options.idTable, searchText)
      vModal += sprintf('<div class="btnResetSearch text-center w-100"><button type="button" id="btnResetSearch%s" name="resetSearch" class="bss-btn btn-primary-02 w-100" ><span class="mx-auto">Clear search</span></button></div>', '_' + that.options.idTable)
      vModal += '  </div>'
      vModal += ' </div>'
      vModal += '</div>'

      // $('#sfc').append($(vModal))
        $('#sideBarContent1').append($(vModal))

      var vFormAvd = createFormAvd(pColumns, searchText, that)
      var timeoutId = 0

      $('#avdSearchModalContent' + '_' + that.options.idTable).append(vFormAvd.join(''))

      $('#s-o').addClass('search-overlay-shrink')

      $('#' + that.options.idForm).off('keyup blur', 'input').on('keyup blur', 'input', (event) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          that.onColumnAdvancedSearch(event)
        }, that.options.searchTimeOut)
      })

       
      $('#btnCloseAvd' + '_' + that.options.idTable).click(() => {
        $('#avdSearchModal' + '_' + that.options.idTable).modal().slideUp()
        $('#s-o').addClass('search-overlay-shrink')
        // $('#avdSearchModal' + '_' + that.options.idTable)
      })

      $('#btnClose2Avd' + '_' + that.options.idTable).click(() => {
        $('#avdSearchModal' + '_' + that.options.idTable).modal().slideUp()
        $('#s-o').addClass('search-overlay-shrink')
      })

      $('#avdSearchModal' + '_' + that.options.idTable).modal()
    } else {
      $('#avdSearchModal' + '_' + that.options.idTable).modal()
    }

    $('#btnResetSearch' + '_' + that.options.idTable).click(() => {
      $('input[name^="field-"]').each(function (index, value) {
        console.log($(this).attr('name'))
        $('input[name^="field-"]').val('')
      })
    })
  }

  var createFormAvd = function (pColumns, searchText, that) {
    var htmlForm = []
    htmlForm.push(sprintf('<div class="card-body form-group"><form class="form-horizontal" id="%s" action="%s" ><div class="row">', that.options.idForm, that.options.actionForm))
      for (var i in pColumns) {
        var vObjCol = pColumns[i]
        if (!vObjCol.checkbox && vObjCol.visible && vObjCol.searchable) {
          htmlForm.push('<div class="col-12 input-group mb-1">')
          // htmlForm.push(sprintf('<label class="control-label">%s</label>', vObjCol.title))
          // htmlForm.push(sprintf('<div class="row"><div class="col-"><div class="d-flex text-dark">%s</div><div class="d-flex"><input type="text" class="form-control" name="field-%s" placeholder="%s" id="%s"></div></div></div>', vObjCol.title, vObjCol.field, vObjCol.title, vObjCol.field))
          htmlForm.push(sprintf('<div class="row text-small"><div class="col-"><div class="d-flex text-dark">%s</div><div class="d-flex"><input type="text" class="form-control" name="field-%s" id="%s"></div></div></div>', vObjCol.title, vObjCol.field, vObjCol.field))
          htmlForm.push('</div>')
          // htmlForm.push('</div>')
      }
    }
    htmlForm.push('</div>')
    htmlForm.push('<div class="row">')
    // htmlForm.push('<div class="col-12 input-group d-flex justify-content-between"><button type="button" class="bss-btn btn-primary-02 flexi-item w-1 justify-content-center" id="btnCloseAvd' + '_' + that.options.idTable + '">Cancel</button><button type="button" class="bss-btn btn-primary-02  flexi-item w-1 justify-content-center" id="btnClose2Avd' + '_' + that.options.idTable + '">Search</button></div>')
    // htmlForm.push('</div>')
    htmlForm.push('</form>')
    htmlForm.push('</div>')
    htmlForm.push('</div>')

    return htmlForm
  }

  $.extend($.fn.bootstrapTable.defaults, {
    advancedSearch: false,
    idForm: 'advancedSearch',
    actionForm: '',
    idTable: undefined,
    onColumnAdvancedSearch () {
      return false
    }
  })

  $.extend($.fn.bootstrapTable.defaults.icons, {
    advancedSearchIcon: 'fa fa-search'
  })

  $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
    'column-advanced-search.bs.table': 'onColumnAdvancedSearch'
  })

  $.extend($.fn.bootstrapTable.locales, {
    formatAdvancedSearch () {
      return 'Search'
    },
    formatAdvancedCloseButton () {
      return 'Close'
    }
  })

  $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales)

  var BootstrapTable = $.fn.bootstrapTable.Constructor
  var _initToolbar = BootstrapTable.prototype.initToolbar
  var _load = BootstrapTable.prototype.load
  var _initSearch = BootstrapTable.prototype.initSearch

  BootstrapTable.prototype.initToolbar = function () {
    var that = this
    var html = []

    _initToolbar.apply(this, Array.prototype.slice.apply(arguments))

    if (!this.options.search) {
      return
    }

    if (!this.options.advancedSearch) {
      return
    }

    if (!this.options.idTable) {
      return
    }

    // html.push(sprintf('<div class="columns columns-%s btn-group float-%s" role="group">', this.options.buttonsAlign, this.options.buttonsAlign));
    // html.push(sprintf('<button class="btn btn-default%s' + '" type="button" name="advancedSearch" aria-label="advanced search" title="%s">', that.options.iconSize === undefined ? '' : ' btn-' + that.options.iconSize, that.options.formatAdvancedSearch()));
    // html.push(sprintf('<i class="%s %s"></i>', that.options.iconsPrefix, that.options.icons.advancedSearchIcon))
    // html.push('</button></div>');

    // that.$toolbar.prepend(html.join(''));

    // heathenscript - original commented out above - hid the button
    // html.push(sprintf('<button class="btn btn-default%s" type="button" name="advancedSearch" aria-label="advanced search" title="Advanced Search">' +
    html.push(sprintf('<button id="sfGrow" href="javascript:void()" data-backdrop="false" class="btn btn-greenButton%s' + '" type="button" name="advancedSearch" aria-label="search" title="Search" style="display: none;">' +
    '<i class="%s %s align-middle"></i>' +
    ' Advanced Search</button>', +Number(that.options.iconSize) === undefined ? '' : ` btn-${that.options.iconSize}`, that.options.iconsPrefix, that.options.icons.advancedSearchIcon))
    $('#sideBarContent1').append(html)

    that.$toolbar.find('button[name="advancedSearch"]')
    $('#table').on('post-header.bs.table', () => {
      // $('#avdSearchModal' + '_' + that.options.idTable).css('display', 'block')
      // $('#avdSearchModal' + '_' + that.options.idTable).slideDown()
      showAvdSearch(that.columns, that.options.formatAdvancedSearch(), that.options.formatAdvancedCloseButton(), that)
    })

    that.$toolbar.find('button[name="advancedSearch"]')
      .off('click').on('click', () => {
        $('#avdSearchModal' + '_' + that.options.idTable).slideDown()
        $('#avdSearchModal' + '_' + that.options.idTable).css('display', 'block')
        showAvdSearch(that.columns, that.options.formatAdvancedSearch(), that.options.formatAdvancedCloseButton(), that)
      })
  }


  BootstrapTable.prototype.load = function (data) {
    _load.apply(this, Array.prototype.slice.apply(arguments))

    if (!this.options.advancedSearch) {
      return
    }

    if (typeof this.options.idTable === 'undefined') {
      return
    } else {
      if (!firstLoad) {
        var height = parseInt($('.bootstrap-table').height())
        height += 10
        $('#' + this.options.idTable).bootstrapTable('resetView', {
          height
        })
        firstLoad = true
      }
    }
  }

  BootstrapTable.prototype.initSearch = function () {
    _initSearch.apply(this, Array.prototype.slice.apply(arguments))

    if (!this.options.advancedSearch) {
      return
    }

    var that = this
    var fp = $.isEmptyObject(this.filterColumnsPartial) ? null : this.filterColumnsPartial

    this.data = fp ? $.grep(this.data, (item, i) => {
      for (var key in fp) {
        var fval = fp[key].toLowerCase()
        var value = item[key]
        value = $.fn.bootstrapTable.utils.calculateObjectValue(that.header,
          that.header.formatters[$.inArray(key, that.header.fields)], [value, item, i], value)

        if (!($.inArray(key, that.header.fields) !== -1 &&
            (typeof value === 'string' || typeof value === 'number') &&
            (value + '').toLowerCase().indexOf(fval) !== -1)) {
          return false
        }
      }
      return true
    }) : this.data
  }

  BootstrapTable.prototype.onColumnAdvancedSearch = function (event) {
    var text = $.trim($(event.currentTarget).val())
    var $field = $(event.currentTarget)[0].id

    if ($.isEmptyObject(this.filterColumnsPartial)) {
      this.filterColumnsPartial = {}
    }
    if (text) {
      this.filterColumnsPartial[$field] = text
    } else {
      delete this.filterColumnsPartial[$field]
    }

    this.options.pageNumber = 1
    this.onSearch(event)
    this.updatePagination()
    this.trigger('column-advanced-search', $field, text)
  }
}(jQuery)