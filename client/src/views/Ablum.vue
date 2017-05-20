<template>
    <Row>
        <Col span="8">
        <ClassifyTree type="ablum"></ClassifyTree>
        </Col>
        <Col span="16">
        <div class="demo-upload-list" v-for="(item,i) in uploadList" key="i">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
    
        <Upload :headers="{Accept:'image/png'}" :data="{'type':this.$store.state.currentType}" ref="upload" name="avatar" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="http://localhost:3000/upload/ablums" style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="查看图片" v-model="visible">
            <img :src="'http://localhost:8000/upload/ablums/' + imgName" v-if="visible" style="width: 100%">
        </Modal>
        </Col>
    </Row>
</template>
<script>
import ClassifyTree from '../components/ClassifyTree.vue'
export default {
    data() {
        return {
            imgName: '',
            visible: false,
            uploadList: []
        }
    },
    components: {
        ClassifyTree
    },
    computed: {
        defaultList() {
            return this.$store.state.defaultList
        }
    },
    methods: {
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            // // 从 upload 实例删除数据
            var vm = this;
            console.log(file._id);
            this.$http.delete(`http://localhost:3000/upload/ablums/${file._id}`).then(res => {
                console.log(res);
                if (res.data.status == '200') {
                    const fileList = vm.$refs.upload.fileList;
                    vm.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                } else {
                    this.$Notice.warning({
                        title: '服务器连接出错',
                        desc: '文件 ' + file.name + ' 无法删除，请重试！'
                    });
                }
            })
        },
        handleSuccess(res, file, fileList) {
            // 因为上传过程为实例，这里模拟添加 url;

            console.log(res, file, fileList)
            if (res.code = '200') {
                var data = res.data;
                file.url = 'http://localhost:8000/' + data.path;
                file.name = data.filename;
            }
            console.log(this.uploadList)
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 100;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 100 张图片。'
                });
            }
            return check;
        }
    },
    mounted() {
        console.log('加载', this.defaultList)
        console.log('jiazai')
        this.uploadList = this.$refs.upload.fileList;
    }
}
</script>
<style>
.demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
