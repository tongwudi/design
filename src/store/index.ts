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
    getComponentList: (state) => {
      return state.componentsList
    },
    getGridLayout: (state) => {
      return JSON.parse(sessionStorage.getItem('layout') || '[]') || state.layout
    },
    selectedConfig: (state) => {
      const selectedWidget = state.layout.find((obj) => obj.i === state.selectedWidgetId)
      if (!selectedWidget) {
        return
      }
      return selectedWidget.config
    },
  },
  actions: {
    addWidget(widget: DragWidget) {
      this.layout.push(widget as layoutItem)
    },
    updateWidget(id: string, newWidget: DragWidget) {
      const index = this.layout.findIndex((obj) => obj.i === id)
      const defaultConfig: DefaultConfig = {
        type: 'static',
        data: [],
        url: '',
        method: 'GET',
        dataPath: '',
        option: {
          title: '',
          showSearch: false,
          searchType: 'date',
          searchKey: 'keyword',
        }
      }
      const widget = {
        ...this.layout[index],
        ...newWidget,
        config: defaultConfig,
      }
      this.layout[index] = widget
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
    updateSelectedConfig(newConfig: DefaultConfig) {
      const index  = this.layout.findIndex((obj) => obj.i === this.selectedWidgetId)
      if (index  === -1) {
        return
      }
      this.layout[index]!.config = { ...newConfig }
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
