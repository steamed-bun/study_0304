package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Address;
import com.xiyou.domain.User;
import com.xiyou.service.AddressService;
import com.xiyou.service.UserService;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
public class AddressAction extends ActionSupport implements SessionAware
        , ModelDriven<Address>, Preparable{

    private Map<String, Object> session;
    private Map<String, Object> dataMap;
    private Address address;
    private Integer userId = 0;

    @Autowired
    private AddressService addressService;

    @Autowired
    private UserService userService;

    public String getAddressById(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        address = addressService.getAddressById(address.getAddressId());
        if (address == null){
            dataMap.put("status", "no");
            dataMap.put("message", "无该地址");
            return SUCCESS;
        }
        address.setUser(null);
        dataMap.put("address", address);
        this.setAddress(null);
        return SUCCESS;
    }

    /**
     * 删除一个地址
     * url:address-deleteAddress.action?address.addressId=1
     * @return
     */
    public String deleteAddress(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        addressService.deleteAddress(address.getAddressId());
        this.setAddress(null);
        return SUCCESS;
    }

    /**
     * 获得默认地址
     * url: address-getDefAddress.action
     * @return
     */
    public String getDefAddress(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        String userId = session.get("userId").toString();
        Address address1 = addressService.getDefAddress(userId);
        if (address1 == null){
            dataMap.put("status", "no");
            dataMap.put("message", "该用户无默认地址");
            return SUCCESS;
        }
        //User user = userService.getUserForAddress(userId);
        address1.setUser(null);
        dataMap.put("address", address1);
        this.setAddress(null);
        return SUCCESS;
    }

    /**
     * 已测
     * 保存或修改address
     * url:
     * 1、保存时不需要传address.addressId
     * address-saveOrUpdateAddress.action?address.province.provinceId=1&address.county.countyId=1&address.city.cityId=1&address.street=test&address.tel=18829289582&address.def=1
     * 2、修改时需要传入address.addressId
     * address.addressId=1
     * def {0:非默认 1:默认}
     * @return null
     */
    public String saveOrUpdateAddress(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        String userId = session.get("userId").toString();
        User user = userService.getUserForAddress(userId);
        address.setUser(user);
        addressService.saveOrUpdateAddress(address);
        dataMap.put("addressId", address.getAddressId());
        this.setAddress(null);
        return SUCCESS;
    }

    public void prepareSaveOrUpdateAddress(){
        if (address.getAddressId() == null){
            address = new Address();
        }else {
            address = addressService.getAddressById(address.getAddressId());
        }
    }

    /**
     * 获取当前user的全部地址
     * url:address-getAddressByUserId.action
     * @return
     */
    public String getAddressByUserId(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        String  userId = session.get("userId").toString();
        List<Address> addresses = addressService.getAddressByUserId(userId);
        for (Address address: addresses) {
            address.setUser(null);
        }
        //dataMap.put("user", userService.getUserForAddress(userId));
        dataMap.put("addresses", addresses);
        this.setAddress(null);
        return SUCCESS;
    }

    @Override
    public Address getModel() {
        return address;
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Map<String, Object> getDataMap() {
        return dataMap;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public void prepare() throws Exception {
    }
}
