package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.xiyou.domain.Address;
import com.xiyou.service.AddressService;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
public class AddressAction extends ActionSupport implements SessionAware
        , ModelDriven<Address> {

    private Map<String, Object> session;
    private Map<String, Object> dataMap;
    private Address address;
    private Integer userId = 0;

    @Autowired
    private AddressService addressService;

    /**
     * 删除一个地址
     * url:address-deleteAddress.action?address.addressId=1
     * @return
     */
    public String deleteAddress(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        addressService.deleteAddress(address.getAddressId());
        return SUCCESS;
    }

    /**
     * 已测
     * 保存或修改address
     * url:
     * 1、保存时不需要传address.addressId
     * address-saveOrUpdateAddress.action?address.province.provinceId=1&address.county.countyId=1&address.city.cityId=1&address.street=test&address.user.userId=1
     * 2、修改时需要传入address.addressId
     * address.addressId=1
     * @return null
     */
    public String saveOrUpdateAddress(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        addressService.saveOrUpdateAddress(address);
        return SUCCESS;
    }

    /**
     * 获取当前user的全部地址
     * url:address-getAddressByUserId.action?userId=1
     * @return
     */
    public String getAddressByUserId(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        List<Address> addresses = addressService.getAddressByUserId(userId);
        for (Address address: addresses) {
            address.setUser(null);
        }
        dataMap.put("addresses", addresses);
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
}
