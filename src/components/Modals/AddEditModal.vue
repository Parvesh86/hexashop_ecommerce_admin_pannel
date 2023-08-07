<template>
    <div>
        <CModal backdrop="static" :visible="showModal" @close="() => { $emit('handleClose') }">
        <CModalHeader>
            <CModalTitle>
                <slot name="modal-heading"></slot>
            </CModalTitle>
        </CModalHeader>
        <CModalBody><slot name="modal-body"></slot></CModalBody>
        <CModalFooter>
            <CButton color="primary" @click="$emit('handleSubmit')">Submit</CButton>
        </CModalFooter>
        </CModal>
    </div>
  </template>
  <script>
    export default {
        props:{
            showModal:Boolean
        }
    }
  </script>