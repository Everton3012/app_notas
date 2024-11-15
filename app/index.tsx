import { useState, useEffect } from "react";
import { Text, View, StatusBar, TouchableOpacity, StyleSheet,TextInput} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export default function Index() {

  const [estado, setEstado] = useState("leitura");
  const [anotacao, setAnotacao] = useState("");

  const setData = async() => {
    try{
      AsyncStorage.getItem('anotacao').then((anotacao) => {
        if (anotacao) {
            setAnotacao(JSON.parse(anotacao))
        }
      })
    }catch(err){

    }
    alert("sua anotação foi salva")
  }

  function atualizarTexto() {
    setEstado('leitura');
    setData();
  };

  if(estado == 'leitura'){
    return (
      <View style={{flex:1 ,backgroundColor: '#ccc'}}>
        <StatusBar />
        <View style={styles.header}><Text style={{textAlign:'center', color:"#ccc", fontSize:18}}>Aplicativo Anotação</Text></View>

        {
          (anotacao != '') ?
          <View style={{padding:30}}><Text style={styles.anotacao}>{anotacao}</Text></View>
          :
          <View style={{padding:30}}><Text style={{fontSize: 20, opacity: 0.3}}>Nenhuma anotação encontrada :</Text></View> 
        }
        
        {
          (anotacao == "") ?
          <TouchableOpacity onPress={() => setEstado('atualizando')} style={styles.btnAnotacao}><Text style={styles.btnAnotacaoTexto}>+</Text></TouchableOpacity>
          :<TouchableOpacity onPress={() => setEstado('atualizando')} style={styles.btnAnotacao}><Text style={styles.btnSalvarTexto}>Editar</Text></TouchableOpacity>
        }
      </View>
    );
  } else if(estado == 'atualizando'){
    return(
      <View style={{flex:1}}>
        <StatusBar />
        <View style={styles.header}><Text style={{textAlign:'center', color:"#ccc", fontSize:18}}>Aplicativo Anotação</Text></View>

        <TextInput autoFocus={true} onChangeText={(text) => setAnotacao(text)} multiline={true} style={{textAlignVertical: 'top', padding: 30, height:300 ,fontSize:16}} value={anotacao} ></TextInput>
        
        <TouchableOpacity onPress={() => atualizarTexto()} style={styles.btnAnotacao} ><Text style={styles.btnSalvarTexto}>Salvar</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    width: '100%',
    padding: 20,
    backgroundColor: '#069'
  },
  anotacao: {
    fontSize: 15,
    
  },
  btnAnotacao:{
    position: 'absolute',
    right:20,
    bottom:20,
    width: 50,
    height:50,
    backgroundColor: '#069',
    borderRadius: 50,
  },
  btnAnotacaoTexto:{
    color:"#fff",
    position: 'relative',
    textAlign: 'center',
    top:2,
    fontSize:30
  },
  btnSalvarTexto:{  
    color:"#fff",
    position: 'relative',
    textAlign: 'center',
    top:12,
    fontSize:15
  }
})