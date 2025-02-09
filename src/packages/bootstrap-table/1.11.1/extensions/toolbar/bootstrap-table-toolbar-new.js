/**
 * @author: aperez <aperez@datadec.es>
 * @version: v2.0.0
 *
 * @update Dennis Hernández <http://djhvscf.github.io/Blog>
 */
/* eslint consistent-this: "off", vars-on-top: "off", no-undefined: "off", prefer-template: "off", no-useless-concat: "off", guard-for-in: "off" */

!function ($) {
  // 'use strict'

  var firstLoad = false

  var sprintf = $.fn.bootstrapTable.utils.sprintf

  var showAvdSearch = function (pColumns, searchTitle, searchText, that) {
    if (!$('#avdSearchModal' + '_' + that.options.idTable).hasClass('modal')) {
      var vModal = sprintf('<div id="avdSearchModal%s"  class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">', '_' + that.options.idTable)  
      vModal += '<div id="advSearch" class="modal-dialog modal-xs">'
      vModal += ' <div class="modal-content">'
      vModal += '  <div class="modal-header">'
      vModal += sprintf('<h4 class="modal-title"><i class="fa fa-search mr-1"></i> %s</h4>', searchTitle)
      vModal += '   <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="float-right" >&times;</button>'
      vModal += '  </div>'
      vModal += '  <div class="modal-body modal-body-custom">'
      vModal += sprintf('   <div class="container-fluid" id="avdSearchModalContent%s" style="padding-right: 0px;padding-left: 0px;" >', '_' + that.options.idTable)
      vModal += '   </div>'
      vModal += '  </div>'
      vModal += sprintf('<div class="modal-footer text-right"><button type="button" id="btnCloseAvd%s" class="btn btn-red" >%s</button></div>', '_' + that.options.idTable, searchText)
      vModal += '  </div>'
      vModal += ' </div>'
      vModal += '</div>'

      $('body').append($(vModal))

      var vFormAvd = createFormAvd(pColumns, searchText, that)
      var timeoutId = 0

      $('#avdSearchModalContent' + '_' + that.options.idTable).append(vFormAvd.join(''))

      $('#' + that.options.idForm).off('keyup blur', 'input').on('keyup blur', 'input', (event) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          that.onColumnAdvancedSearch(event)
        }, that.options.searchTimeOut)
      })

      $('#btnCloseAvd' + '_' + that.options.idTable).click(() => {
        $('#avdSearchModal' + '_' + that.options.idTable).modal('hide')
      })

      $('#avdSearchModal' + '_' + that.options.idTable).modal()
    } else {
      $('#avdSearchModal' + '_' + that.options.idTable).modal()
    }
  }

  var createFormAvd = function (pColumns, searchText, that) {
    var htmlForm = []
    htmlForm.push(sprintf('<form class="form-horizontal" id="%s" action="%s" >', that.options.idForm, that.options.actionForm))
      for (var i in pColumns) {
        var vObjCol = pColumns[i]
        if (!vObjCol.checkbox && vObjCol.visible && vObjCol.searchable) {
          htmlForm.push('<div class="form-group input-row">')
          htmlForm.push(sprintf('<label class="control-label">%s</label>', vObjCol.title))
          htmlForm.push('<div class="">')
          htmlForm.push(sprintf('<input type="text" class="form-control input-md" name="%s" placeholder="%s" id="%s">', vObjCol.field, vObjCol.title, vObjCol.field))
          htmlForm.push('</div>')
          htmlForm.push('</div>')
      }
    }

    htmlForm.push('<div class="form-group">')
    htmlForm.push('<div class="col-sm-offset-9 col-sm-3">')
    htmlForm.push('</div>')
    htmlForm.push('</div>')
    htmlForm.push('</form>')

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
      return 'Advanced search'
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

    // heathenscript - original commented out above
    // html.push(sprintf('<button class="btn btn-default%s" type="button" name="advancedSearch" aria-label="advanced search" title="Advanced Search">' +
    html.push(sprintf('<button class="search-advanced btn btn-clearWhite%s" type="button" name="advancedSearch" aria-label="advanced search" title="Advanced Search">' +
    '<i class="%s %s align-middle"></i>' +
    ' Advanced Search</button>', +Number(that.options.iconSize) === undefined ? '' : ` btn-${that.options.iconSize}`, Number(that.options.iconsPrefix), that.options.icons.advancedSearchIcon))
    $('#extInsert').append(html)


    that.$toolbar.find('button[name="advancedSearch"]')
      .off('click').on('click', () => {
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
