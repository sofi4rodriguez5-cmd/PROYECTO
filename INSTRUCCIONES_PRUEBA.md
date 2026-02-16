# 🧪 INSTRUCCIONES DE PRUEBA - GESTIÓN DE USUARIOS

## 🎯 Objetivo
Verificar que todas las funcionalidades de Gestión de Usuarios funcionan correctamente.

---

## 🚀 PASO 1: Abrir la Aplicación

1. Navega a: `proyecto/frontend/`
2. Abre `index.html` en tu navegador
3. Deberías ver la pantalla de login

---

## 🔐 PASO 2: Iniciar Sesión como Admin

1. Usa las credenciales:
   - **Usuario:** `admin`
   - **Contraseña:** `admin`
2. Haz clic en "Iniciar Sesión"
3. ✅ Deberías ver el menú principal con todas las opciones

---

## ⚙️ PASO 3: Acceder a Ajustes de Administrador

1. En el menú superior, haz clic en **"⚙️ Ajustes ▼"**
2. Se desplegará un menú con dos opciones:
   - 👤 Ajustes de Usuario
   - 🛠️ Ajustes de Administrador
3. Haz clic en **"🛠️ Ajustes de Administrador"**
4. ✅ Deberías ver la pantalla de administración

---

## 👥 PASO 4: Ver Lista de Usuarios

En la sección "👥 Gestión de Usuarios" deberías ver:

```
🛠️ admin
   Administrador
   [Tú]
   Usuario actual

👤 usuario
   Usuario
   [Cambiar Rol] [🗑️]
```

✅ **Verificar:**
- Los usuarios se muestran correctamente
- El usuario actual (admin) está marcado con "Tú"
- El usuario actual NO tiene botones de acción
- Los otros usuarios SÍ tienen botones

---

## ➕ PASO 5: Agregar Nuevo Usuario

1. Desplázate hasta "➕ Agregar Nuevo Usuario"
2. Completa el formulario:
   - **Usuario:** `test`
   - **Contraseña:** `1234`
   - **Rol:** `Usuario`
3. Haz clic en "➕ Agregar Usuario"

✅ **Verificar:**
- Aparece notificación verde: "Usuario 'test' agregado exitosamente"
- El nuevo usuario aparece en la lista
- El formulario se limpia automáticamente
- Las estadísticas se actualizan (Total de usuarios: 3)

---

## 🔄 PASO 6: Cambiar Rol de Usuario

1. Busca el usuario "test" en la lista
2. Haz clic en el botón **"Cambiar Rol"**

✅ **Verificar:**
- Aparece notificación: "Rol de 'test' cambiado a Administrador"
- El ícono cambia de 👤 a 🛠️
- El texto cambia de "Usuario" a "Administrador"
- Las estadísticas se actualizan (Total de administradores: 2)

3. Haz clic nuevamente en **"Cambiar Rol"**

✅ **Verificar:**
- El rol vuelve a "Usuario"
- El ícono vuelve a 👤
- Las estadísticas se actualizan

---

## 🗑️ PASO 7: Eliminar Usuario

1. Busca el usuario "test" en la lista
2. Haz clic en el botón **"🗑️"**
3. Aparecerá un diálogo de confirmación
4. Haz clic en "Aceptar"

✅ **Verificar:**
- Aparece notificación: "Usuario 'test' eliminado"
- El usuario desaparece de la lista
- Las estadísticas se actualizan (Total de usuarios: 2)

---

## 🔒 PASO 8: Protecciones de Seguridad

### Prueba 1: Intentar cambiar tu propio rol
1. Busca tu usuario (admin) en la lista
2. Observa que NO tiene botón "Cambiar Rol"
3. Solo muestra "Usuario actual"

✅ **Verificar:**
- No es posible cambiar tu propio rol

### Prueba 2: Intentar eliminar tu propio usuario
1. Busca tu usuario (admin) en la lista
2. Observa que NO tiene botón 🗑️
3. Solo muestra "Usuario actual"

✅ **Verificar:**
- No es posible eliminar tu propio usuario

---

## 💾 PASO 9: Verificar Persistencia

1. Agrega un nuevo usuario:
   - Usuario: `persistente`
   - Contraseña: `1234`
   - Rol: `Usuario`
2. Haz clic en "🚪 Salir" para cerrar sesión
3. Vuelve a iniciar sesión como admin
4. Ve a Ajustes de Administrador

✅ **Verificar:**
- El usuario "persistente" sigue en la lista
- Los datos se guardaron en localStorage

---

## 📊 PASO 10: Verificar Estadísticas

En la sección "📊 Estadísticas del Sistema" deberías ver:

```
👥 [número]
   Usuarios Totales

🛠️ [número]
   Administradores

🏞️ 8
   Lugares

🏨 6
   Hoteles
```

✅ **Verificar:**
- Los números se actualizan al agregar/eliminar usuarios
- Los números de lugares y hoteles son correctos

---

## 🚫 PASO 11: Verificar Acceso Restringido

1. Cierra sesión (🚪 Salir)
2. Inicia sesión como usuario normal:
   - **Usuario:** `usuario`
   - **Contraseña:** `1234`
3. Haz clic en "⚙️ Ajustes ▼"

✅ **Verificar:**
- Solo aparece "👤 Ajustes de Usuario"
- NO aparece "🛠️ Ajustes de Administrador"

4. Intenta acceder directamente escribiendo en la URL o manipulando el código

✅ **Verificar:**
- Aparece mensaje: "Acceso denegado - Solo administradores"
- No se muestra el contenido de administración

---

## 🎨 PASO 12: Verificar Tema Oscuro

1. Inicia sesión como admin
2. Ve a Ajustes → Ajustes de Usuario
3. Haz clic en "Cambiar a Oscuro"
4. Ve a Ajustes → Ajustes de Administrador

✅ **Verificar:**
- La sección de gestión de usuarios se ve correctamente en tema oscuro
- Los cards tienen fondo oscuro
- El texto es legible
- Los botones funcionan correctamente

---

## 📱 PASO 13: Verificar Responsive

1. Abre las herramientas de desarrollador (F12)
2. Activa el modo responsive
3. Prueba diferentes tamaños:
   - Desktop (1200px+)
   - Tablet (768px)
   - Mobile (375px)

✅ **Verificar:**
- La lista de usuarios se adapta correctamente
- Los botones son accesibles
- El formulario es usable
- No hay elementos cortados o superpuestos

---

## ✅ CHECKLIST FINAL

Marca cada item después de probarlo:

### Funcionalidades Básicas
- [ ] Ver lista de usuarios
- [ ] Agregar nuevo usuario
- [ ] Eliminar usuario
- [ ] Cambiar rol de usuario
- [ ] Formulario se limpia después de agregar
- [ ] Notificaciones aparecen correctamente

### Validaciones
- [ ] No permite agregar usuario duplicado
- [ ] No permite campos vacíos
- [ ] Pide confirmación antes de eliminar
- [ ] No puede eliminar su propio usuario
- [ ] No puede cambiar su propio rol

### Persistencia
- [ ] Los usuarios se guardan en localStorage
- [ ] Los usuarios persisten después de cerrar sesión
- [ ] Los usuarios persisten después de recargar página

### Estadísticas
- [ ] Total de usuarios se actualiza
- [ ] Total de administradores se actualiza
- [ ] Los números son correctos

### Control de Acceso
- [ ] Admin puede ver Ajustes de Administrador
- [ ] Usuario normal NO puede ver Ajustes de Administrador
- [ ] Mensaje de acceso denegado funciona

### UI/UX
- [ ] Íconos correctos por rol (🛠️ / 👤)
- [ ] Badge "Tú" en usuario actual
- [ ] Botones deshabilitados para usuario actual
- [ ] Tema oscuro funciona correctamente
- [ ] Responsive funciona en todos los tamaños

### Funciones Adicionales
- [ ] Exportar usuarios funciona
- [ ] Ver logs del sistema funciona
- [ ] Reiniciar sistema funciona

---

## 🐛 PROBLEMAS COMUNES Y SOLUCIONES

### Problema: No aparece "Ajustes de Administrador"
**Solución:** Asegúrate de iniciar sesión como `admin` / `admin`

### Problema: Los cambios no se guardan
**Solución:** Verifica que localStorage esté habilitado en tu navegador

### Problema: No aparecen notificaciones
**Solución:** Verifica la consola del navegador (F12) para ver errores

### Problema: El formulario no funciona
**Solución:** Asegúrate de completar todos los campos requeridos

---

## 📝 NOTAS ADICIONALES

### Datos de Prueba Sugeridos

**Usuarios para agregar:**
```
Usuario: maria
Contraseña: 1234
Rol: Usuario

Usuario: carlos
Contraseña: 1234
Rol: Administrador

Usuario: laura
Contraseña: 1234
Rol: Usuario
```

### Escenarios de Prueba

1. **Agregar múltiples usuarios:** Agrega 5 usuarios y verifica que todos aparecen
2. **Cambiar roles masivamente:** Cambia el rol de varios usuarios
3. **Eliminar varios usuarios:** Elimina usuarios uno por uno
4. **Persistencia completa:** Agrega usuarios, cierra navegador, abre de nuevo
5. **Acceso concurrente:** Abre en dos pestañas con diferentes usuarios

---

## 🎯 RESULTADO ESPERADO

Al completar todas las pruebas, deberías confirmar que:

✅ **Todas las funcionalidades funcionan correctamente**
✅ **No hay errores en la consola**
✅ **La UI es intuitiva y profesional**
✅ **Los datos persisten correctamente**
✅ **El control de acceso funciona**
✅ **El sistema es responsive**

---

## 🚀 SIGUIENTE PASO

Una vez completadas todas las pruebas, el sistema está listo para:
- ✅ Demostración
- ✅ Presentación
- ✅ Uso en producción
- ✅ Documentación de usuario final

**¡El sistema de Gestión de Usuarios está completamente funcional!** 🎉
