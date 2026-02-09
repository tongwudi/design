import { useDesignerStore } from '@/store/index'

export function useDragLayout(gridConfig: any) {
  const designerStore = useDesignerStore()

  const layout = computed({
    get: () => designerStore.layout,
    set: newLayout => designerStore.updateLayout(newLayout),
  })

  const layoutRef = ref<any>({})
  const itemRefs = ref<any>({})
  const mouseXY = { x: 0, y: 0 }
  let DragPos: any = {}

  onMounted(() => {
    document.addEventListener('dragover', (e) => {
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
    }, false)
  })

  function setLayoutRef(el: HTMLElement) {
    layoutRef.value = el
  }

  function setItemRef(el: HTMLElement, item: any) {
    itemRefs.value[item.i] = el
  }

  async function drag(component: any) {
    const parentRect = document.getElementById('grid-layout')?.getBoundingClientRect() as DOMRect
    let mouseInGrid = false
    if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
      mouseInGrid = true
    }
    const index = layout.value.findIndex(item => item.i === 'drop')
    if (mouseInGrid === true && (index === -1)) {
      DragPos = {
        ...component,
        i: 'drop',
        x: (layout.value.length * 2) % gridConfig.colNum,
        y: layout.value.length + gridConfig.colNum,
      }
      designerStore.addWidget(DragPos)
      await nextTick()
    }
    const itemRef = itemRefs.value.drop
    if (!itemRef) {
      return
    }
    if (index === -1) {
      return
    }
    if (itemRef.el.style) {
      itemRef.el.style.display = 'none'
    }
    const new_pos = itemRef.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left)
    if (mouseInGrid === true) {
      // dragEvent的参数分别是：[eventName, i, x, y, h, w]
      layoutRef.value.emitter.emit('dragEvent', ['dragstart', 'drop', new_pos.x, new_pos.y, component.h, component.w])
      DragPos = {
        ...DragPos,
        i: String(new Date().getTime()),
        x: new_pos.x,
        y: new_pos.y,
      }
    }
    else {
      layoutRef.value.emitter.emit('dragEvent', ['dragend', 'drop', new_pos.x, new_pos.y, component.h, component.w])
      designerStore.removeWidget('drop')
      await nextTick()
    }
  }

  async function dragend() {
    const parentRect = document.getElementById('grid-layout')?.getBoundingClientRect() as DOMRect
    let mouseInGrid = false
    if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
      mouseInGrid = true
    }
    if (mouseInGrid === true) {
      layoutRef.value.emitter.emit('dragEvent', ['dragend', 'drop', DragPos.x, DragPos.y, DragPos.h, DragPos.w])
      designerStore.updateWidget('drop', DragPos)
      await nextTick()
      layoutRef.value.emitter.emit('dragEvent', ['dragend', DragPos.i, DragPos.x, DragPos.y, DragPos.h, DragPos.w])
    }
  }

  return {
    layout,
    setLayoutRef,
    setItemRef,
    drag,
    dragend,
  }
}
