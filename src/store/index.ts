import { defineStore } from 'pinia'
import { componentsList } from '@/components/index'

export const useDesignerStore = defineStore('designer', {
  state: () => ({
    componentsList: Object.freeze(componentsList),
    layout: [] as layoutItem[],
    gridConfig: {
      colNum: 24,
      rowHeight: 30,
      margin: [10, 10],
    },
    selectedWidgetId: '',
  }),
  getters: {
    getComponentList: (state) => state.componentsList,
    selectedConfig: (state) => {
      const selectedWidget = state.layout.find((obj) => obj.i === state.selectedWidgetId)
      if (!selectedWidget) {
        return null
      }
      return selectedWidget.config || {}
    },
    getGridLayout: (state) => {
      const layout = JSON.parse(sessionStorage.getItem('layout') || '[]') || state.layout
      return layout
    },
  },
  actions: {
    addWidget(widget: layoutItem) {
      const defaultConfig: BasicConfig = {
        title: '',
        showSearch: false,
        searchType: 'date',
        searchKey: 'keyword',
      }
      this.layout.push({
        ...widget,
        config: defaultConfig,
      })
    },
    removeWidget(id: string) {
      this.layout = this.layout.filter((obj) => obj.i !== id)
      if (this.selectedWidgetId === id) {
        this.selectedWidgetId = ''
      }
    },
    setSelectedWidgetId(id: string) {
      this.selectedWidgetId = id
    },
    clearLayout() {
      this.layout = []
      this.selectedWidgetId = ''
    },
    updateLayout(newLayout: layoutItem[]) {
      this.layout = newLayout
    },
    saveLayout(newLayout: layoutItem[]) {
      this.layout = newLayout
      sessionStorage.setItem('layout', JSON.stringify(this.layout))
    },
  },
})
