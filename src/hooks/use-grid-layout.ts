import { useDesignerStore } from '@/store'

export function useGridLayout(layout: any, gridConfig: any) {
  const designerStore = useDesignerStore()

  const layoutRef = ref<any>({})
  const itemRefs = ref<any>({})
  const mouseXY = { x: 0, y: 0 }
  let DragPos: any = {}

  document.addEventListener('dragover', (e) => {
    mouseXY.x = e.clientX
    mouseXY.y = e.clientY
  }, false)

  async function drag(element: any) {
    const parentRect = document.getElementById('grid-layout')?.getBoundingClientRect() as DOMRect
    let mouseInGrid = false
    if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
      mouseInGrid = true
    }
    const index = layout.value.findIndex(item => item.i === 'drop')
    if (mouseInGrid === true && (index === -1)) {
      designerStore.addWidget({
        ...element,
        i: 'drop',
        x: (layout.value.length * 2) % gridConfig.value.colNum,
        y: layout.value.length + gridConfig.value.colNum,
        config: {},
      })
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
      layoutRef.value.emitter.emit('dragEvent', ['dragstart', 'drop', new_pos.x, new_pos.y, element.h, element.w])
      DragPos = {
        ...layout.value[index],
        i: String(new Date().getTime()),
      }
    }
    else {
      layoutRef.value.emitter.emit('dragEvent', ['dragend', 'drop', new_pos.x, new_pos.y])
      layout.value = layout.value.filter(obj => obj.i !== 'drop')
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
      layoutRef.value.emitter.emit('dragEvent', ['dragend', 'drop', DragPos.x, DragPos.y])
      layout.value = layout.value.filter(obj => obj.i !== 'drop')
      designerStore.addWidget({ ...DragPos })
      await nextTick()
      layoutRef.value.emitter.emit('dragEvent', ['dragend', DragPos.i, DragPos.x, DragPos.y])
    }
  }

  function setLayoutRef(el: HTMLElement) {
    layoutRef.value = el
  }

  function setItemRef(el: HTMLElement, item: any) {
    itemRefs.value[item.i] = el
  }

  return {
    drag,
    dragend,
    setLayoutRef,
    setItemRef,
  }
}
