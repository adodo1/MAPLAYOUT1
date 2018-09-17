
require.config({
    paths:{
        'text':'js/text',//默认认为和当前文件在同一个文件夹下
    }
});
//因为默认认为加载的文件和当前文件在同一文件夹下，所以"../"返回上层目录
require(["components/leftPanel/leftPanel","components/map/map"],function(leftPanel,Map){
    leftPanel.init();
    Map.init();
})